# Contracts of TaiShangSoulCard

## 0x01 DID Solution

DID Solution is the basic of SoulCard, it's an Address Aggregator and Endpoints Aggregator.

It can be implemented by `Solidity` or `MOVE` smart contract language.

MOVE Version see in:

> https://github.com/WeLightProject/DID-Solution-In-Move

Solidity Version see in this folder.

## 0x02 SoulCard

SoulCard is the `SBT Contract` that compatible with `ERC721`.

The `transfer` has be rewrited, so the NFT can only be transfer into zero address to burn, can not be transfer to anyone else.

SoulCard types in different pharses:

```bash
Dynamic Preview 
        ↓ Verification
PermaWeb Version(Unchangeable)
        ↓ Mint
NFT(can be seen in NFT Galleries&Explorer)                                                                
```



