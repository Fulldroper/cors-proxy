###Simple CORS Proxy Server [POST and GET] methods Allowed
###- how to install?
> 1. clone repozitory
`git clone https://github.com/Fulldroper/cors-proxy.git`
> 2. open folder
`cd cors-proxy` 
###- how to start server?
> 1. install packages
`npm i`
> 2. start server
`nmp start`
### - How to use?

Scheme of reqest. Allowed only over (get) reqest
`http://server.com/?q=site&h=headers&t=type`

Types descriptions:

`site` - its string contains url, cancontains get parameters. If parameters more than one instead of an `&`, you need to use `%amp`. 

`headers` - contain string of headers. Header is written as follows `Header:Value`, Where `Header` is name of header and `Value` is value of header. If Headers more than one written with a comma(`,`) like this `Header1:Value1,Header2:Value2,HeaderN:ValueN`.

`type` - contain string with type of request. Allowed now types is `post` and `get`

####of the listed types, only the type `site` is mandatory


###- how change port?
> 1. Open file `package.json`
> 2. Change `"config": {
    "port": "8080"
  },` on your. 
> For example `"config": {
    "port": "80"
  },`
> 3. Save changes

More questions? [mail me](mailto://full_droper.pm.me)