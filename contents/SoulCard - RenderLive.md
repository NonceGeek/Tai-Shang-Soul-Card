作为 Snippet，其实任何在 Elixir Phoenix 框架内合法的模块，都是可以被 FaaS 这个框架动态加载的，包括大名鼎鼎的 **LiveView** 模块，比如：`CodesOnChain.SoulCardRenderLive`。

在分析 `CodesOnChain.SoulCardRenderLive` 以前，我先介绍一下 LiveView 是什么。

## LiveView

### 概念

LiveView 的官方定义：

>LiveView provides rich, real-time user experiences with server-rendered HTML.
>...
>a LiveView is nothing more than a process that receives events as messages and updates its state. The state itself is nothing more than functional and immutable Elixir data structures.

LiveView 是服务端渲染的页面。和这个页面绑定的，是一个保存在服务器，并处于监控中的状态。当任何用户操作，触发相应的事件，或者后端的状态发生改变，页面就会实时产生变化。

想正确安装并使用 LiveView，创建 Phoenix app 的时候需要添加特定参数：`mix phx.new my_app --live`。

### 基本结构和渲染流程

一个 LiveView 页面其实就是一个 Elixir 里实现了特殊 `callback` 的模块。官网展示的最简单的 LiveView 模块例子是这样的：

```elixir
defmodule MyAppWeb.ThermostatLive do
  # In Phoenix v1.6+ apps, the line below should be: use MyAppWeb, :live_view
  use Phoenix.LiveView

  def render(assigns) do
    ~H"""
    Current temperature: <%= @temperature %>
    """
  end

  def mount(_params, %{"current_user_id" => user_id} = session, socket) do
    temperature = Thermostat.get_user_reading(user_id)
    {:ok, assign(socket, :temperature, temperature)}
  end
end
```

然后我们可以在 Phoenix 的 Router 里把这个 LiveView 模块和 URL 路由绑定：

```elixir
defmodule MyAppWeb.Router do
  use Phoenix.Router
  import Phoenix.LiveView.Router

  scope "/", MyAppWeb do
    live "/thermostat", ThermostatLive
  end
end
```

当你在浏览器输入这个 URL，请求 Phoenix 进行首次渲染时，LiveView 的 `mount/3` 回调就会被触发。`_params` 里面包含的是 URL 路由的路径参数和 query 查询参数。`mount/3` 回调执行完毕后，`handle_params/3` 回调会被调用（非必需）处理那些参数，最后把 `render/1` 返回的结果作为普通的 HTML 结果返回。

从上面的样例来看，这个 LiveView 最后渲染的页面就包含了当前的温度。这个温度值是根据当前用户 `user_id` 获取而来，然后调用 `assign/3` 方法赋值到 `socket` 里保存的状态 `assigns` 里面，供页面渲染时通过变量 `<%= @temperature %>` 取用。

### 外置的页面模板

上面介绍的是直接嵌入 LiveView 模块的页面模板，这种写法一般只在内容比较少的时候采用。如果一个页面代码超过几十行，那最好还是抽出文件来单独放置好一些。如果 LiveView 的文件名为 `lib/my_app_web/live/thermostat_live.ex`，那这个页面的模板只要和它同名就行了 `lib/my_app_web/live/thermostat_live.html.heex`。然后 LiveView 模块里面的 `render/1` 方法也可以去掉了。


## 详解 CodesOnChain.SoulCardRenderLive

拥有了 LiveView 的基本概念，我们可以看一下要在 FaaS 里实现 LiveView 模块，需要怎么做了。以下样例包含了最基本的内容：

```elixir
defmodule CodesOnChain.XyzLive do
  use FunctionServerBasedOnArweaveWeb, :live_view
  alias Components.KVHandler.KVRouter

  def register() do
    KVRouter.put_routes(
      [
        ["/xyz-live", "XyzLive", "index"]
      ]
    )
  end

  @impl true
  def render(assigns) do
    ~H"""
    Hello World
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
```

### URL 路由注册

可以看出，这个 LiveView 模块和前面介绍的基本没什么区别。只是，因为这个模块作为一个 Snippet，需要被 FaaS 动态加载，所以，这个模块还需要提供一个 `register/0` 方法供 FaaS 的动态模块方法调用机制，把指向它的 URL 注册到 `router.ex` 里。这里需要借助的是 FaaS 框架提供的 `KVRouter.put_routes/1` 函数。

```elixir
defmodule Components.KVHandler.KVRouter do
  @external_resource "priv/extra_routes.json"

  def get_routes() do
    @external_resource
    |> File.read!()
    |> Poison.decode!()
  end

  @doc """
    for example:
      [["/uri1", "TestLive", "index"]]
  """
  def put_routes(routes) do
    payload =
      get_routes()
      |> Kernel.++(routes)
      |> Poison.encode!()

    File.write!(
      "priv/extra_routes.json",
      payload
    )

    Code.eval_file("lib/function_server_based_on_arweave_web/router.ex")
  end
end
```

在 FaaS，路由是保存在项目内部的 `priv/extra_routes.json` 文件里面的。这个 JSON 就是一个大的数组，每个元素就是一组路由需要的信息：URL，对应的模块名，和响应 URL 的处理函数名。因为 Phoenix 项目启动的时候，就已经通过 `router.ex` 模块把所有的路由都加载完毕，所以，当动态加入新的路由后，需要用 `Code.eval_file` 这种方式动态编译，重载整个 `router.ex` 模块。

### 外部模板加载

虽然样例 `MyAppWeb.ThermostatLive` 已经是一个完整可用在 FaaS 的 LiveView 模块，但是，固定生成内容的 LiveView 怎么可能满足我们 Cool-Oriented 编程的 NonceGeek 的要求。

如前面介绍，Phoenix 的 LiveView 模块，是可以搭配一个 `.html.heex` 的文件来编写更复杂，包含更多互动元素的页面。可是，让 FaaS 加载的 Snippet 都是以单模块的形式存在的。所以，我们打算让 `render/1` 函数向外部动态获取内容，以替代 `.html.heex`。经过一番探索，包括读 `~H` sigil 和 EEx 的源码，以下的 `render/1` 实现方式可以动态编译从外部读取 Heex `template`： 

```elixir
  @impl true
  def render(assigns) do
    # template can be dynamically loaded from File/Internet/Blockchain
    quoted = EEx.compile_string(template, [engine: Phoenix.LiveView.HTMLEngine])

    {result, _bindings} = Code.eval_quoted(quoted, assigns: assigns)
    result
  end
```

`template` 是合法的 Heex 模板或者 HTML 文件就可以了。`SoulCardRenderLive` 是从 `assigns.template_gist_id` 指定的 Gist 读取的。具体可以参考这个样例：[soul_card_template.html](https://gist.github.com/leeduckgo/1a301c084577fde54df73ced3139a3cb)

这里需要强调的是，模板是通过 `Code.eval_quoted/3` 动态执行外部文件的代码来实现的，所以有很大安全风险，必须确保外部文件不包含恶意代码。所以，必须确保外部代码可控，且无法被篡改，比如保存在 IPFS 或 Arweave 区块链上。

### 外部数据加载

SoulCardRenderLive 里包含了多个支持不同参数的 `mount/3` 方法，是为了适配前端传不同的参数，能相应初始化不同的内容来生成不同的页面。页面数据的填充，我们可以看到很多是通过 `SoulCardRender` 模块，从 IPFS 上获取之前已经准备好的 JSON 格式文件，把 Mirror 文章链接，或者用户 Avatar 替换进去。

_**备注：此处插入不同页面的截图以示说明。**_


### 代码参考

[**CodesOnChain.SoulCardRender.ex**](https://gist.github.com/leeduckgo/9813ca9e206bbda1afb413ecea331063#file-codesonchain-soulcardrender-ex)
[**CodesOnChain.SoulCardRenderLive.ex**](https://gist.github.com/leeduckgo/9813ca9e206bbda1afb413ecea331063#file-codesonchain-soulcardrenderlive-ex)
