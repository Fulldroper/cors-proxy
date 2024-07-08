# Simple CORS Proxy Server [POST and GET] methods Allowed

The purpose of this project is to create an HTTP proxy server to normalize requests with CORS and facilitate API interactions with any request method and on-the-fly modifications.

### Project Benefits
This project simplifies the development process by handling CORS issues and providing a flexible way to interact with APIs, making it easier to test and develop applications.

### How the Project Works
The project sets up a proxy server using Node.js that intercepts HTTP requests, adds the necessary CORS headers, and allows for modification of the request and response on the fly.

### Repository and Installation
[GitHub Repository](https://github.com/Fulldroper/cors-proxy)

To install and run the project:

1. Clone the repository:
    ```bash
    git clone https://github.com/Fulldroper/cors-proxy
    cd cors-proxy
    ```

2. Install dependencies and start the server:
    ```bash
    npm install
    npm start
    ```
### How to use?

Make default requests to `/` path and set header `cors-url` with site url

For ignore headers set header `cors-ignore` with array of headers will be deleted from request

all methods, headers, params duplicated automatically

### How change port?
> 1. Create file `.env`
> 2. write `PORT=<Your port>`
> 3. Save changes

### How change enterpoint?
> Change or add to file `.env` next line `ENTERPOINT=/`

### How change alowed methods?
> Change or add to file `.env` next line `ALOWED=GET, POST, PUT, DELETE`

### Project Workflow
1. **Setup Project:** Initialize the project structure and dependencies.
    ```bash
    npm init
    npm install
    ```

2. **Create Proxy Server:** Set up the proxy server with CORS handling.
    ```javascript
    const express = require('express');
    const { createProxyMiddleware } = require('http-proxy-middleware');
    const app = express();

    app.use('/', createProxyMiddleware({
        target: 'http://example.com',
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            // Modify request headers
            proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        },
        onProxyRes: (proxyRes, req, res) => {
            // Modify response headers
            proxyRes.headers['X-Special-Proxy-Response-Header'] = 'baz';
        }
    }));

    app.listen(3000, () => {
        console.log('CORS proxy server running on port 3000');
    });
    ```

### Skills Gained
- Developing proxy servers with Node.js
- Handling CORS issues in web development
- Modifying HTTP requests and responses on the fly


More questions? [mail me](mailto://full_droper@pm.me)
