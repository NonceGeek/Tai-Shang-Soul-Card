## 详解 CodesOnChain.UserManager

SoulCard 里面有一些 Manager 类的 Snippet，它们负责配合前端的功能，进行数据的 CRUD。`TemplateManager` 提供的是页面模板相关的操作，`UserManager` 提供的是用户相关的操作。

### 消息验证和鉴权

在普通的 Web 2.0 应用，用户都需要先用帐号密码，或者手机验证码登录，然后才能进行操作，比如发消息，修改个人资料等。SoulCard 作为 Web3 架构下的应用，它对操作的验证和鉴权则有一点不同。

我们来看一下 `UserManager` 下的创建用户这个方法：

```elixir
def create_user(info, role, addr, msg, signature) do
  # update user info when the key does not exist
  with true <- Verifier.verify_message?(addr, msg, signature),
    true <- time_valid?(msg) do
    payload =
      addr
      |> KVHandler.get(ModuleHandler.get_module_name(__MODULE__))
      |> do_create_user(role, info)
    handle_role(role, addr, info)
    KVHandler.put(addr, payload, ModuleHandler.get_module_name(__MODULE__))
  else
    error ->
      {:error, inspect(error)}
  end
end
```

这个方法有三个比较特别的参数：

* `addr`：用户的 Web3 身份，用 MetaMask 登录 SoulCard 应用的钱包地址。
* `msg`：用户在 SoulCard 页面操作下，发送过来的消息。
* `signature`：用户在 SoulCard 页面操作下，对发送过来的 `msg`，使用钱包私钥生成的签名。

通过 FaaS 里面的已经封装好的组件方法 `Verifier.verify_message?(addr, msg, signature)`，我们就可以对用户操作进行鉴权，**确保是当前地址的用户进行的操作**，并且**消息没有在传输的过程中被篡改**。

那 `time_valid?/1` 这个方法具有什么作用呢？

```elixir
  def time_valid?(msg) do
    [_, timestamp] = String.split(msg, "_")

    timestamp
    |> String.to_integer()
    |> do_time_valid?(timestamp_now())
  end

  defp do_time_valid?(time_before, time_now) when time_now - time_before < @valid_time do
    true
  end

  defp do_time_valid?(_time_before, _time_now), do: false
```

其实，`msg` 里面带上了用户操作的时间。`time_valid?/1` 这个检查是确保用户提交消息的时间，和服务器收到的时间间隔，在一个合理的范围内。因为，黑客有可能在网络上截获到用户发送的消息，然后重新发送一次，这种攻击就是著名的[重放攻击(Replay Attacks)](https://zh.m.wikipedia.org/zh-hans/%E9%87%8D%E6%94%BE%E6%94%BB%E5%87%BB)。验证消息的时间是防范此类攻击的其中一种手段。

对于消息的处理和签名，前端对应的代码如下，`signByMetamask()` 方法提供了这些参数。它的代码详解会在前端代码分析的时候再介绍，有兴趣的可以自己先摸索一下。

```javascript
// Tai-Shang-Soul-Card/dapp/namecard/src/pages/dao/index.jsx
const submitInfos = async () => {
  const { _baseCache } = await addInfoByIPFS(infos)
  const hash = _baseCache.get('z')
  const { addr, msg, signature } = await signByMetamask()
  const data = {
    params: [
      { ipfs: hash },
      'dao',
      addr,
      msg,
      signature
    ]
  }
  const res = await createUser(JSON.stringify(data))
  if(res.data.result.status=='ok'){
    props.history.push({
      pathname:'/home',
      query:{
        address:infos.ethereum_addr,
        role:'dao'
      }
    });
  }
}
```

`UserManager` 模块里其它的代码逻辑，其实就没什么特别的地方了。基本就是配合使用 `ModuleHandler` 和 `KVHandler` 组件，新建或更新用户资料，保存到 FaaS 的键值数据库中。
