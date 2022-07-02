# SoulCard揭秘：如何编写一个snippet

💡 道（DAO）者万物之奥。善人之宝，不善人之所保。

近期，E. Glen Weyl, Puja Ohlhaver, Vitalik Buterin 等人发表论文《去中心化社会：寻找 Web3的灵魂》，代表了区块链领域下一个十年的发展趋势——从纯粹的分布式金融（Defi）延展开来，在分布式金融与分布式社会（DeSoc）两条道路上同时探索。

包含 DAO（分布式自组织） 在内的各类族群是分布式社会的基本组成单元。这里的族群是广义上的 —— DAO
是一个族群、一种职业是一个族群、一个小区的居民也可以是一个族群。

我们认为，如果要逐步建设基于区块链的分布式社会（DeSoc based on
Blockchain），那么首先建立起 **能标志灵魂（灵魂的含义见论文）族群身份的链上名片** 是重要的第一步。

# 特点

SoulCard 具有如下特点：

- 多次翻页的 SoulCard 具备更高的信息密度，可以被嵌入到多种社交场景内。如 Mirror 文章、Twitter 等
- 在铸造为 NFT 时需 DAO Owner 进行验证，通过机制确保 SoulCard 的可信性
- SoulCard 上记载的技能等相关信息会有 SpeedRun 记录、Github PR 记录等进行证明
- 在 SoulCard Owner 加入 DAO 之后，SoulCard 上会附带其参与的 DAO 的信息，从而高效、清晰地对 Owner 的族群进行标记
- SoulCard 包含其 Owner 的 Web3 足迹设计SoulCard 被设计为可多次翻页的 HTML。

# 架构：dSS

`dSS`——`dApp-Snippet-Script`架构，是 NonceGeekDAO 提出的一种新的区块链应用开发架构。

从架构的角度来讲，一个「纯正」的 dApp 应该是一个纯前端的应用，以确保去中心化：

```jsx
+-----------+     +------------------+     +------------+

| Front-End |-----| Wallet(Metamask) |-----| Blockchain |

+-----------+     +------------------+     +------------+
```

但在实际的情况中，dApp 往往依然会用到部分后端服务，以提升其性能或满足部分需求。

例如：获取全量的 NFT 数据、通过签名从后端拿到一些隐私数据……

这些需求往往十分轻量。因此，通过传统的方式在服务器上启动一个后端服务，会显得过于「沉重」。所以，FaaS提供了一种轻量级的的方式：Snippet。

![](https://raw.githubusercontent.com/zhenfeng-zhu/pic-go/main/202206302104974.png)

# 如何编写一个Snippet

我们先来看一下snippet的格式：

```elixir
defmodule CodeOnChain.XX do
	@moduledoc """
		这里是这个snippet的文档描述
	"""

	def get_module_doc, do: @module_doc

	# 引入faas的组件
	alias Components.xx
	
	# 接下来是自定义的代码

end
```

## 函数

后端是以faas的形式对外提供服务的，faas的全称时function as a
service。顾名思义，最重要的就是函数，我们先来看下函数在Elixir中是如何定义使用的。

<aside>
💡 函数是一等公民

</aside>

最常用的就是有名字的函数，命名函数通过def关键字来定义在某个模块中：

```elixir
defmodule Greeter do
  def hello(name) do
    "Hello, " <> name
  end
end

iex> Greeter.hello("Sean")
"Hello, Sean"
```

如果函数体只有一行，可以缩写成do:

```elixir
defmodule Greeter do
  def hello(name), do: "Hello, " <> name
end
```

在Elixir中，模式匹配不仅限于变量，也可以用在函数签名上，我们可以用模式匹配找到第一个匹配参数的模式，然后执行它后面的函数体。

```elixir
defmodule Length do
	def of([]), do: 0
	def of([_ | tail]), do: 1 + of(tail)
end

iex> Length.of([])
0
iex> Length.of([1, 2, 3])
3
```

也可以这样实现重载：

```elixir
defmodule Greeter2 do
  def hello(), do: "Hello, anonymous person!"   # hello/0
  def hello(name), do: "Hello, " <> name        # hello/1
  def hello(name1, name2), do: "Hello, #{name1} and #{name2}"
                                                # hello/2
end

iex> Greeter2.hello()
"Hello, anonymous person!"
iex> Greeter2.hello("Fred")
"Hello, Fred"
iex> Greeter2.hello("Fred", "Jane")
"Hello, Fred and Jane"
```

我们在上面代码注释中列出了函数的全称。第一个函数不接受任何参数，因此是 **`hello/0`**
；第二个函数接受一个参数，因此是 **`hello/1`**，以此类推。不同于其他语言的函数重载，这些函数被认为是不同的。

我们也可以使用模式匹配的方式来处理传入的参数。

比如说，我们的一个方法接收一个 map 作为参数。但是，我们只对其中的某一个键值感兴趣。那么，我们可以这样来模式匹配函数调用时需要的键值：

```elixir
defmodule Greeter1 do
  def hello(%{name: person_name}) do
    IO.puts "Hello, " <> person_name
  end
end
```

假设我们现在有一个字典，里面包含了一个人的名字，Fred：

```elixir
iex> fred = %{
name: "Fred",
age: "95",
favorite_color: "Taupe"  
...> }
```

下面就是我们调用 **`Greeter1.hello/1` ，**并传入字典 **`fred`** 后得到的结果：

```elixir
# 传入整个字典
iex> Greeter1.hello(fred)
"Hello, Fred"
```

我们经常在Enum相关的函数去使用匿名函数，它们经常被用来传递给其他函数。 要定义匿名函数，我们需要 **`fn`**和 **`end`**
关键字，在这两者之间，我们可以定义任意数量的参数和函数体，它们用 **`->`**  分隔开。

我们来看一个简单的例子：

```elixir
iex> sum=fn (a, b)-> a+ bend
iex> sum.(2, 3)
5
```

因为在 Elixir 中使用匿名函数非常常见，所以有一个快捷方式来做这件事：

```elixir
iex> sum=&(&1+ &2)
iex> sum.(2, 3)
5
```

你可能也猜到了，在这种简写的模式下，函数的参数可以通过 **`&1`**，**`&2`**，**`&3`** 等来获取。

## 模块：

<aside>
💡 根据以往的经验，我们知道把所有的函数都放到同一个文件是不可控的。

</aside>

我们的snippet都是以模块的形式进行加载调用的，所以来看模块在Elixir中是如何实现的。

模块可以让我们把函数组织到不同的命名空间。除了能为函数分组，它还允许我们定义命名函数和私有函数。

一个简单的例子：

```elixir
defmodule Example do
	def hello(name) do
		"Hello #{name}"
	end
end
```

Elixir也允许嵌套的模块，这让你可以轻松定义多层命名空间：

```elixir
defmodule Example.Greetings do
  def morning(name) do
    "Good morning #{name}."
  end

  def evening(name) do
    "Good night #{name}."
  end
end
```

模块也可以加一些属性，来看一下：

```elixir
defmodule Example do
  @greeting "Hello"

  def greeting(name) do
    "#{@greeting} #{name}"
  end
end
```

需要注意有些属性是保留的，最长用到的三个为：

- moduledoc：当前模块的文档。
- doc：函数和宏的文档
- behaviour：使用otp或者用户自定义的行为

## 组合

我们的faas提供了很多的组件去使用，那么在Elixir中应该如何去使用的。答案呼之欲出，那就是组合。Elixir提供了好几种让我们可以在模块中访问到其他模块的方式。

- alias

这个是非常常见的，可以让我们通过别名访问模块：

```elixir
defmodule Sayings.Greetings do
  def basic(name), do: "Hi, #{name}"
end

defmodule Example do
  alias Sayings.Greetings

  def greeting(name), do: Greetings.basic(name)
end

# Without alias

defmodule Example do
  def greeting(name), do: Sayings.Greetings.basic(name)
end
```

如果别名有冲突，或者我们想要给那个模块命名一个不同的名字时，我们可以用 `as` 参数：

```elixir
defmodule Example do
  alias Sayings.Greetings, as: Hi

  def print_message(name), do: Hi.basic(name)
end
```

Elixir 也允许一次指定多个别名：

```elixir
defmodule Example do
  alias Sayings.{Greetings, Farewells}
end
```

- import

我们可以用import从另一个模块中导入函数：

```elixir
iex> last([1, 2, 3])
** (CompileError) iex:9: undefined function last/1
iex> import List
nil
iex> last([1, 2, 3])
3
```

默认情况下，import会导入模块所有的函数和宏，我们可以用only和except来过滤。

更详细的可以参考官方文档。

- require

require用来告诉Elixir我们要调用其他模块的宏。和import的区别时，require对宏有效，对函数无效。

```elixir
defmodule Example do
  require SuperMacros

  SuperMacros.do_stuff
end
```

如果我们调用了未被加载的宏，Elixir 会报错。

- use

use 用来修改我们当前的模块。当我们调用use时，Elixir会执行指定模块中所定义的__using__回调。回调执行的结果会成为当前模块定义的一部分。

# ****Snippets & Components using in SoulCard****

```jsx
Snippets:
-CodesOnChain.SoulCardRenderLive.ex -
  CodesOnChain.SoulCardRender.ex -
  CodesOnChain.SpeedRunFetcher.ex -
  CodesOnChain.TemplateManager.ex -
  CodesOnChain.UserManager.ex;
Components:
-ipfs.ex -
  ar_graphql_interactor.ex -
  arweave_handler.ex -
  mirror_handler.ex -
  gist_handler.ex -
  kv.ex -
  verifier.ex;
```

组件库：

- `ipfs.ex`：用于 IPFS 相关操作；
- `ar_graphql_interactor`，Arweave 网络的 GraphQL 交互模块；
- `arweave_handler.ex`，用于和 Arweave 节点进行交互，读写操作；
- `mirror_handler.ex`，处理 Mirror 应用存储在 Arweave 网络上的内容；
- `gist_handler.ex`，对 Gist 中的内容进行处理，例如存储在 Gist 上的 SoulCard 模板；
- `kv.ex`，一个本地的K-V数据库。
- `verifier.ex`，用于验证 metamask 签名的信息，以进行鉴权。

Snippets：

- `CodesOnChain.UserManager.ex`，用户管理，包括普通用户和 DAO 用户。需要注意的是，用户的信息是以`json`的形式存在
  IPFS 上的，因此本地数据库进存储`addr-ipfs`的关联就行了；
- `CodesOnChain.TemplateManager.ex`，模板管理，本质上是`:template_list-[gist_id_1, gist_id_2, ...]`这样的一个键值对；
- `CodesOnChain.SoulCardRender.ex`，对元数据（例如`user-%{user: %{ipfs: ipfs}}`进行渲染，得到更丰富的数据；
- `CodesOnChain.SpeedRunFetcher.ex`，对 SpeedRun 端的数据进行处理；
- `CodesOnChain.SoulCardRenderLive.ex`，将数据+模板实时的渲染为SoulCard页面，以便进行预览与下一步操作。

接下来我们会从如下几个方面来分析Snippets的实现细节，敬请期待！
