# Simple CORS Proxy Server [POST and GET] methods Allowed

### - how to install?
> 1. clone repozitory
`git clone https://github.com/Fulldroper/cors-proxy.git`
> 2. open folder
`cd cors-proxy` 

### - how to start server?
> 1. install packages
`npm i`
> 2. start server
`nmp start`

### - How to use?

Make default requests to `/` path and set header `cors-url` with site url

For ignore headers set header `cors-ignore` with array of headers will be deleted from request

all methods, headers, params duplicated automatically

### - how change port?
> 1. Create file `.env`
> 2. write `PORT=<Your port>`
> 3. Save changes

### - how change enterpoint?
> Change or add to file `.env` next line `ENTERPOINT=/`

### - how change alowed methods?
> Change or add to file `.env` next line `ALOWED=GET, POST, PUT, DELETE`

More questions? [mail me](mailto://full_droper@pm.me)