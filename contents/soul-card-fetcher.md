# SoulCard 揭秘：Fetcher

> 编程，就是数据转换

正如其名字，Fetcher是用来从第三方获取数据，然后做一系列的清洗、转换，最终适配我们的应用所使用的格式。

目前SoulCard的Fetcher是SpeedRunFetcher。

## SpeedRunChallenge

SpeedRunChallenge 是一系列挑战任务的集合，主要面向开发者。当开发者完成一系列任务之后，会获取一些等级证书。

作为面向builder的SoulCard，开发者在SpeedRunChallenge的Level是在一定程度上可以衡量一个Web3开发者的水平。所以就需要我们请求到SpeedRunChallenge的OpenAPI，获取到相关信息进行展示。

## 源码分析

### 第一步，引入ExHttp组件。

我们一般通过http请求的方式去获取第三方服务的数据，FaaS为我们提供了一个http客户端请求的组件：ExHttp。

这个组件使用起来特别简单：

```elixir
alias Components.ExHttp

url = "http://example.com"

url |> ExHttp.get()
```

我们首先通过alias的方式进行组件的引入，然后调用组件的get方法进行API的请求。

这里有一个小技巧，Elixir最好用的一个功能，那就是 Pipe Operator：管道操算符。管道操作符就是把前一个表达式的结果，作为第一个参数传递给后一个表达式。

我们先看一个多层嵌套调用：

```elixir
foo(bar(baz(new_function(other_function()))))
```

相信很多同学都写过类似的代码，这个可读性很差，如果我们用管道操作符之后：

```elixir
other_function() |> new_function() |> baz() |> bar() |> foo()
```

是不是瞬间优美起来了！

### 第二步，确认第三方API以及返回结果

在SpeedRunChallenge中，返回builder相关信息的API接口是下面这个：

```elixir
"#{speedrun_url}/builders/#{address}"
```

请求的返回值如下所示：

```json
{
	"id": "0x8ac3607DD03A222bee339dfda35ae13BdefFB24d",
	"role": "registered",
	"challenges": {
		"simple-nft-example": {
			"status": "ACCEPTED",
			"deployedUrl": "https://fenix-nft.vercel.app/",
			"autograding": true,
			"submittedTimestamp": 1656251620584,
			"contractUrl": "https://rinkeby.etherscan.io/address/0xf6caf0ac13181c121f8f7f3739530706ffdcc834#code",
			"reviewComment": "You passed all tests on Challenge "
		}
	},
	"creationTimestamp": 1656251413880
}
```

### 第三步，实现fetch_data

`fetch_data/2`，是我们业务函数。它接受两个参数，一个是builder的地址，一个请求的type类型。

首先通过模式匹配的形式，获取到speedrun_api_endpoint和speedrun_url。

```elixir
    %{
      speedrun_api_endpoint: speedrun_api_endpoint,
      speedrun_url: speedrun_url
    } = fetch_speedrun(type)
```

然后调用fetch_data/4，在这个函数中真正执行了对第三方服务的调用：

```elixir
      res =
        speedrun_api_endpoint
        |> build_user_url(addr, :back)
        |> ExHttp.http_get()
```

然后调用 do_fetch_data 去执行业务的逻辑，解析请求的结果。

do_fetch_data也是有两个，前面我们讲过模式匹配也可以应用于函数的参数中：

```elixir
  defp do_fetch_data({:error, 404}, _addr, speedrun_url, _type) do
    {:error, "user has not registered speedrun@#{speedrun_url} yet"}
  end

  defp do_fetch_data({:ok, data}, addr, speedrun_url, type) do

  end
```

当 res是 {:error, 404} 的返回时，命中第一个函数，返回值就是

```
 {:error, "user has not registered speedrun@#{speedrun_url} yet"}
```

只有当res是 {:ok, data}的时候，才会执行第二个函数。

### 第三步，数据转换

在上一步中，命中 {:ok, data} 的函数，负责对返回值进行解析封装，最终组装成我们想要的格式，我们来看下实现方式。

```elixir
  defp do_fetch_data({:ok, data}, addr, speedrun_url, type) do
    accepted_challenges =
      data
      |> Map.get("challenges", %{})
      |> Map.to_list()
      |> Enum.filter(fn {_name, challenge} ->
        Map.get(challenge, "status") == @status_accepted
      end)

    len = length(accepted_challenges)

    {:ok, %{
      chanllege_passed_num: len,
      link: build_user_url(speedrun_url, addr, :front),
      level: get_level(len),
      type: type
    }}
  end
```

提取 challenges，拿到所有状态是通过的挑战，根据完成挑战的多少，赋予前端等级的展示。

整段代码，可读性很强，在管道操作符的加持下，代码显得很优美。

## 结语

目前SoulCard的Fetcher暂时只有一个，随着后续项目的发展，会有越来越多的第三方服务进行接入，展示在builder的namecard中。

亲爱的朋友，你愿意同我携手加入Web3的冒险旅程么，让我们一起构建SoulCard，共同寻找到通往Web3灵魂！
