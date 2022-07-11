## 详解 Components.KVHandler

### 概念与设计

后端开发同学，应该对 Key-Value 数据库有些了解，比如 Redis 或者 RocksDB。Key-Value 数据库主要是按键值对的方式来保存数据，就像是 Map 字典一样。一般来说 Key，Value 都是以字符串的形式存取的。

`KVHandler` 就是封装好的组件，帮我们像用 Key-Value 数据库那样使用 Postgres 数据库。它默认存取的数据是 JSON 格式的数据。

从 `KVHandler` 相关的源代码可以看到，它只操作一个数据库的 `kv` 表。这个表就只有 key, value 列，再加上 created_by 来记录创建者，或者说是 namespace。这里的数据库 Schema 定义和操作，是借用 Ecto 这个模块提供的方法。具体 Ecto 的使用这里就不介绍了。


```elixir
defmodule Components.KV do
  alias Components.KV

  use Ecto.Schema
  import Ecto.Changeset

  schema "kv" do
    field :key, :string
    field :value, :string
    field :created_by, :string

    timestamps()
  end

  @doc false
  def changeset(kv, attrs) do
    kv
    |> cast(attrs, [:key, :value, :created_by])
    |> validate_required([:key, :value, :created_by])
    |> unique_constraint(:key_and_created_by, name: :key_and_created_by)
  end
end
```

### 数据存取

`KVHandler.get/2` 方法和普通的 Key-Value 数据库的操作稍微不同的地方，在于它除了需要键值 Key，还需要提供创建者 `created_by` 才能定位一条记录。你可以把 key + created_by 当作是复合主键。

这么做的原因是为了划分存储空间，也可以让我们方便采用 `get_by_module_name/1` 方法，把同一记录创建者的所有数据一次获取出来。

因为 KVHandler 操作的默认是 JSON 格式，所以 `get/2` 方法会自动尝试转换，如果出错则原值返回。

同样，保存数据的 `put/3` 方法，也会自动把 key 转换为字符串，把 value 从 JSON 格式转换为字符串形式保存。

```elixir
defmodule Components.KVHandler do
  alias Components.KV
  alias FunctionServerBasedOnArweave.Repo

  import Ecto.Query

  def get(k, created_by) do
    result = Repo.one(from kv in KV, where: kv.key == ^k and kv.created_by == ^created_by)
    do_get(result)
  end

  defp do_get(nil), do: nil
  defp do_get(%{value: value}) do
    result_decoded = Poison.decode(value)
    case result_decoded do
      {:error, _reason} ->
        value
      {:ok, payload} ->
        ExStructTranslator.to_atom_struct(payload)
    end
  end

  def get_by_module_name(created_by) do
    KV
    |> where([kv], kv.created_by== ^created_by)
    |> Repo.all()
  end

  def put(k, v, module_name) when not is_bitstring(k), do: put(to_string(k), v, module_name)

  def put(k, v, module_name) do
    v_str = Poison.encode!(v)

    case Repo.one(from p in KV, where: p.key == ^k) do
      nil ->
        %KV{key: k, value: v_str, created_by: module_name}
      val ->
        val
    end
    |> KV.changeset(%{ value: v_str})
    |> Repo.insert_or_update()
  end

  def get_all() do
    Repo.all(KV)
  end
end
```
