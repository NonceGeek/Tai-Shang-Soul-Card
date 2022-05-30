# 0x00 Quick Introdcution

面向分布式社会(DeSoc)中各族群的社交需求，NonceGeek 团队打造SoulCard 产品 —— **能标志灵魂的族群身份的链上名片**。

![SoulCard -- new contact way! (1)](https://tva1.sinaimg.cn/large/e6c9d24egy1h2q36a3x8jj20u00xjgnx.jpg)

<center>图 SoulCard 在Web3 社交场景中的意义</center>

![截屏2022-05-30 上午6.23.07](https://tva1.sinaimg.cn/large/e6c9d24egy1h2q36epe8jj20sc0vu41a.jpg)

<center>图 SoulCard 对 Web3 社交网络的好处</center>

相对于 LinkedIn 主页等传统的个人信息展示，SoulCard 具有如下特点：

* 多次翻页的 SoulCard 具备更高的信息密度，可以被嵌入到多种社交场景内。如 Mirror 文章、Twitter 等
* 在铸造为 NFT 时需 DAO Owner 进行验证，通过机制确保 SoulCard 的可信性
* SoulCard 上记载的技能等相关信息会有 SpeedRun 记录、Github PR 记录等进行证明
* 在 SoulCard Owner 加入 DAO 之后，SoulCard 上回附带其参与的 DAO 的信息，从而高效、清晰地对 Owner 的族群进行标记
* SoulCard 包含其 Owner 的 Web3 足迹👣

# 0x01 Background

## 1.1 基于人类社交天性构建积木化的「灵魂名片」

近期，E. Glen Weyl, Puja Ohlhaver, Vitalik Buterin 等人发表论文《去中心化社会：寻找 Web3 的灵魂》。代表了区块链领域下一个十年的发展趋势——从纯粹的分布式金融（Defi）延展开来，在分布式金融与分布式社会（DeSoc）两条道路上同时探索。

包含 DAO（分布式自组织） 在内的各类族群是分布式社会的基本组成单元。这里的族群是广义上的 —— DAO 是一个族群、一种职业是一个族群、一个小区的居民也可以是一个族群。

我们认为，如果要逐步建设基于区块链的分布式社会（DeSoc based on Blockchain），那末首先建立起 **能标志灵魂（灵魂的含义见论文）族群身份的链上名片** 是重要的第一步。

诚然，已经有许多区块链项目或多或少的涉及了这一命题，尤其是和社交相关的——例如 ENS。

但现有的各类设施远未成熟，至少存在如下几大问题：

- **只有 Web3 是不够的**

既然落足点是需要构建出一个人的「灵魂」，那么数据仅来自 Web3 世界、甚至是仅来自虚拟世界，构建出来的灵魂都是片面的。以区块链开发者这一灵魂类型为例，仅有其链上行为数据作为数据来源是不足的，其在 Github 上的数据也极其重要——虽然 Github 是「中心化」的。

- **积木化程度不足**

没有的各类项目构建 Profile 时，尚未实现「积木化」，以让灵魂构建者可以自由地构建其 Profile。而这一点是必要的，在链上世界里，我们需要相当程度的「捏灵魂自由」（如同游戏里的捏脸自由）。如果我们只能遵循死的格式，那么我们捏出来的灵魂肯定也是死气沉沉。

- **没有考虑到人类的「社交天性」**

现有的产品的思考角度并非社会学与心理学，因此和人类的「社交天性」的匹配度极为有限。例如，人们的社交符合「第一眼法则」。例如有说法认为，在面试时的前 x 秒的感性判断已经决定了结果，所有的后续交流、沟通不过是为了结果寻找理由。我们不去追究这种说法的严谨程度，但是，如何在短时间内给社交对象留下良好的第一印象十分重要。因此，在物理世界的社交中，我们会有着各类为了增强第一印象的守则，例如各种场所的 Dress Code。

在虚拟世界中，这件事情变得有趣起来。因为我们在物理世界中，人与人第一次 Touch 更多的是「接触式 Touch」，「非接触式 Touch」其次。但在虚拟世界里「非接触式 Touch」非常常见。文章、视频、网站等多种渠道，是我们首次认识一个人的重要途径。

因此，在这种情况下，如何高效地给潜在的社交对象留下良好而深刻的第一印象，是虚拟世界中交流的**非常重要的命题**。

如果仅仅是没有经过思考的**信息堆砌**——就像我们在邮箱里经常能看到的又臭又长的简历，那么无法达成这一目标。因此，需要在产品设计层面对这件事情进行更进一步的思考，设计出更符合人类「社交天性」的产品——这是 DeSocial 领域目前所缺乏的。

## 1.2 结构洞理论与「交叉灵魂」

> **结构洞**（英语：structural holes）是[社会网络](https://zh.wikipedia.org/wiki/社会网络)研究中的一个概念，最早由[罗纳德·斯图亚特·伯特](https://zh.wikipedia.org/w/index.php?title=罗纳德·斯图亚特·伯特&action=edit&redlink=1)提出，指网络中拥有互补的信息来源的两个个体之间未连接形成的空缺。伯特引入这一概念是为了解释[社会资本](https://zh.wikipedia.org/wiki/社会资本)差异的根源。他的理论表明，个人在社区或其他社会结构中嵌入的方式具有某些位置优势/劣势。结构洞的相关研究跨越社会学、经济学和计算机科学等领域。

> —— 维基百科

![img](https://r8jmm3f9xe.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjVjMmVhYTY0NjhlZTgwMjhhNzFhZmY4NWMyNmFmODZfNmUxa2NrNmxhMWpxRGljYWx0bWw5OXRRU05ma2FxNnJfVG9rZW46Ym94Y25RMEhMM3JCR3p5TXZnSHA0NTBMbXRoXzE2NTM4NjcyMjk6MTY1Mzg3MDgyOV9WNA)

因此，在进行 SoulCard 产品设计的时候，我们要更充分的考虑到如何通过 SoulCard 能更好的让填补结构洞的关键人物显现出来 —— 他们在过去往往是隐性的，而无论是对于关键节点本身，还是其所连接到的社会网络而言，都是多赢的局面。例如，一个关键人物同时是Coder & Designer，他同时作为活跃参与者身处于一个 DevDAO 和 DesignDAO 之中，那么他就有可能引领两个 DAO 的资源置换，从而创造新的可能与新的价值。在 DeSoc 中，我们可以将这种人物所拥有的灵魂命名为**「交叉灵魂」**。

## 1.3 新型合作关系下的信任

> 齐美尔在《货币哲学》和《社会理论的基础》中提出，信任是交换机制的重要条件，是社会性持续性的前提。社会学家詹姆斯·科尔曼在其巨著 《社会理论的基础》里用了很大的篇幅讨论信任，信任是社会资本的重要组成部分（罗伯特·D .普特内姆的《使民主运作 :现代意大利的市民传统》）信任有助于提高微观经济组织的运作效率。

降低建立信任的成本，消除建立信任的壁垒都require信息交换的真实性（verified profile) 和结构建立的有效性（短的时间找到对的人，最短路径匹配合适人选）。

## 1.4 DAO 品牌的去中心化传播

和任何其它组织相同，DAO 依然需要品牌建设。除了传统的品牌建设思路，DAO 也应当考虑更加去中心化（同样也是更原始的😁）传播方式——

> **口口相传。**

在这种情况下，让 DAO 来制定名片的 Template，从而让每个 DAO 的成员在做自己的推销员的同时，也顺带成为 DAO 的推销员是十分必要的。因此，在 SoulCard 的设计中，我们需要考虑到三类角色：

> **Member:** 通过 SoulCard 推广自己，从而在非接触的情况下获得更多高质量、有趣的人与人的连接，从而获得 Serendipity。

> **DAO:** 让 Member 成为自己的「推销员」，同时让成员对 DAO 有更强的价值认同感。

> **Receiver:** 看到 SoulCard 的人，可以快速高效地理解其所接触的人与其背后的组织。

## 1.5 信息熵与价值

传统的简历、个人主页等方式没有从机制的角度来避免冗长、沉闷的信息，而有效信息浓度太低带来的则是对 Profile Owner 的价值感的降低。

传统的解决方案是通过一些简历相关的课程去增加简历的信息密度与价值，但我们认为，可以通过机制来解决这件事——例如，让 SoulCard Owner 在提供其写过的技术文章的时候，仅提供其认为最有价值的 3 篇文章。

# 0x02 Web3 Stacks

# 0x03 SoulCard Contract

# 0x04 Architecture -- SSD

# 0x05 Teams

```
"query": {
  transactions(
    tags: [
      { name: "App-Name", values: ["MirrorXYZ"] }
      {
        name: "Contributor"
        values: ["0x73c7448760517E3E6e416b2c130E3c6dB2026A1d"]
      }
    ]
  ) {
    edges {
      node {
        id
      }
    }
  }
}

```

