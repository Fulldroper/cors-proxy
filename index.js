const 
    cfg = require("./package.json").config,
    http = require("http"),
    request = require('request'),
    url = require('url');;
    
    console.log(process.argv);

const server = http.createServer((req, res) => {
    const info = url.parse(req.url, true).query
    if (!info.q) return;
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


});
server.listen(cfg.port);
