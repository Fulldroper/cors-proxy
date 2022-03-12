const 
    cfg = require(`${__dirname}/package.json`).config,
    http = require("http"),
    request = require('request'),
    {readFileSync} = require("fs")
    url = require('url');
// load default page
const defaultPage = readFileSync(`${__dirname}/WIKI.pdf`)
const server = http.createServer((req, res) => {
    console.log(`New connection from ${req.socket.localAddress}`);
    const info = url.parse(req.url, true).query
    if (!info.q) {
        res.setHeader("Content-type","application/pdf")
        res.writeHead(200);
        res.end(defaultPage)
    } else {
        const options = {}
        // replace appercant
        options.url = info.q.replaceAll("%amp","&")
        // parce and mount all headers
        if (info.h) {
            options.headers = {};
            (info.h.split(",")).forEach(el => {
                const _el_ =  el.split(":")
                if (_el_.length != 2) return;
                options.headers[`${_el_[0]}`] =  `${_el_[1]}`
            });
        }
        // make req
        request[
            info.t === "post" ? "post" : "get"
        ](options, (err, date, body) => {
            // exit on error
            if (err) return;
            // fetch result
            const {
                statusCode, headers
            } = date;               
            // replace headers
            for (const key in headers) {
                res.setHeader(key, headers[key]);
            }
            // answer
            res.writeHead(statusCode);
            res.end(body);
        })
    }
});
console.log(`Server running on ${cfg.port} port!`);
server.listen(cfg.port);