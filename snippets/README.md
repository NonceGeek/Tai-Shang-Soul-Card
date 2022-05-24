## What is snippet

Based on Arweave's FaaS system, code `snippet` written in languages such as `Elixir/Rust` can be pulled from the Arweave Network and loaded into Runtime to provide functional service support for other applications.

All code snippets, including functions and modules, are stored in the Arweave blockchain, and dynamically loaded into memory while the FaaS service is running. The snippets are transparent, open, and immutable. Therefore, it is possible to share the uploaded functions among users through an open function market, thus making F (in FaaS) a Lego building block.

## What is FaaS
Function-as-a-Service is a supplementary service of traditional cloud services and many cloud service providers provide such services. For many Apps/dApps, they may only require simple back-end functions to get deployed at certain times in which case renting a server is not cost-efficient. In this case, they could choose to rent the function service and get charged per call of the function service.

From the perspective of the service purchaser, the use of FaaS saves the rental cost of the service; from the perspective of the service provider, a large number of function services on one server or cluster reduces the operating and maintenance cost.

More about FaaS system [here](https://github.com/WeLightProject/tai_shang_micro_faas_system#tai-shang-micro-faas-system)

## How to load Snippets

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h0c0nnbgyyg20ts0k9nmg.gif)

## How to call Snippets

Provide arguments to the function of the specified code snippet and run the function

Example:

```
curl --location --request POST 'https://faas.noncegeek.com/api/v1/run?name=EndpointProvider&func_name=get_endpoints' \
--header 'Content-Type: application/json' \
--data-raw '{
    "params": []
}'
```

| title | description |
| ---   | ---         |
| api | /api/v1/run |
| Method | POST |
| Content-Type | application/json |

Query Params：

| Key	| Type	| Value	| Required |
| --- | ---| --- | ---|
| name	| string	|"EndpointProvider"	| Y/N |
| func_name	| string	| "get_endpoints"	| Y/N |

Post Data:

```
{
    "params": [params_list]
}
```

Return:

```
{
    "result": {
        "arweave": "https://arweave.net",
        "ethereum": "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        "moonbeam": "https://rpc.api.moonbeam.network",
        "polygon": "https://polygon-rpc.com"
    }
}
```

More to see at the [API docs](https://github.com/WeLightProject/tai_shang_micro_faas_system/wiki/API-Docs)
