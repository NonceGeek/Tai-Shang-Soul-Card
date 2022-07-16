# 一个Hello World Snippet的例子
让我们先从Hello World开始！
```ruby
defmodule CodeOnChain.HelloWorld do
  @moduledoc """
    this is a hello world snippet
  """
  def get_module_doc, do: @module_doc
  
  def hello_world() do
    "hello world"
  end
end 
```
我们的Snippet是用Elixir来编写的，现在不懂Elixir没关系，后面会有一些教程带大家学习Elixir。Elixir的语法和Ruby类似，是一个基于Erlang的函数式编程语言。

1. 我们首先定义个一个module，他的名字叫 HelloWorld。
1. get_module_doc是一个保留的函数，用来返回该snippet的使用doc。
1. 最重要的就是这个hello_world函数，在这里就简单的返回一个字符串 "hello world"。
# 将Snippet存储到Gist上
FaaS系统提供了几种托管Gist的方式：

- Gist：gist是一个有趣的服务，最简单的功能就是分享代码片段。
- 区块链：这个是最酷的一个功能，把我们的代码存储到链上，任何人都无法篡改，可以很方便的分发。但是存到链上是一个成本比较高的操作，本次示例，我们就先把Snippet存到gist中。

[https://gist.github.com/](https://gist.github.com/)
在这里创建一个自己的gist，输入 HellWorld.ex 作为文件名，然后把上面的代码拷贝进去，并且选择是创建一个public的gist。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29623198/1657955231230-3f1f5f39-f1cc-43ce-bb21-457b7565cc97.png#clientId=u11843dec-e80e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=376&id=ud9be720e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=752&originWidth=1658&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78135&status=done&style=none&taskId=u544001ef-cccd-4db2-a63b-a947d4c8cbd&title=&width=829)
如上图所示，[https://gist.github.com/zhenfeng-zhu/af93b6d5aeadace96ca77e6fed62b078](https://gist.github.com/zhenfeng-zhu/af93b6d5aeadace96ca77e6fed62b078)   这个链接就是gist的访问链接。
我们可以拿到url的后缀： af93b6d5aeadace96ca77e6fed62b078 作为gist的id。
# 将Snippet加载到一个运行中的FaaS系统里
首先通过浏览器，打开我们的faas system。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29623198/1657955701493-b8ec242e-86cf-42d2-821c-f44c5145f6e3.png#clientId=u11843dec-e80e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=675&id=ue6fdf1c4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1350&originWidth=2690&originalType=binary&ratio=1&rotation=0&showTitle=false&size=173193&status=done&style=none&taskId=ud164f146-97b7-4f7a-8074-095afe10fd6&title=&width=1345)
点击sign in，进行登录。因为人人都能运行一个micro faas，所以输入自己的用户名和密码即可完成登录。
> 如何启动自己的micro faas，参考

完成登录之后，就可以发现多了一栏，Add new  function by Tx id
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29623198/1657956022245-a4bda0f8-94be-4388-8fd3-0ba2036d3319.png#clientId=u11843dec-e80e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=672&id=u6c2eef59&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1344&originWidth=2668&originalType=binary&ratio=1&rotation=0&showTitle=false&size=179097&status=done&style=none&taskId=u4ce76e52-654d-4c1b-b37b-c44b9c27091&title=&width=1334)
点击进入到页面中，把我们发布在gist中的id输入进去，点击 Add Code 即可。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29623198/1657956112929-3e856689-8921-4016-87fe-abbd12221d40.png#clientId=u11843dec-e80e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=602&id=ufe2f7d33&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1204&originWidth=2732&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107483&status=done&style=none&taskId=uf1ee6623-b31e-4a0f-8960-4b932d88799&title=&width=1366)
之后，就可以在 code loader 界面找到HelloWorld代码片段。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29623198/1657956201258-e95cbcc4-33c0-49d0-a14e-df33931d52fb.png#clientId=u11843dec-e80e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=539&id=u63c3fbd0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1078&originWidth=2682&originalType=binary&ratio=1&rotation=0&showTitle=false&size=114417&status=done&style=none&taskId=u5f5e5334-db27-48a5-8184-0b015557d47&title=&width=1341)
大工告成！
one more thing，相比你发现在add code的时候，可以去通过arweave和nft进行添加，在这里我们就留一个作业让大家尝试一下通过Arweave添加代码。
