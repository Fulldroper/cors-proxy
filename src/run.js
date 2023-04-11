(async () => {
  // import request module
  const a = await require("axios");

  // setup url handlers
  const URL = await require("node:url")

  // setup environment
  process.env.NODE_ENV || (await require("dotenv").config({ debug: false }));

  // import config with default settings
  const {
    PORT = 80,
    HOST = "0.0.0.0",
    DEBUG = false,
    ALOWED = "POST, GET, PUT, DELETE",
    ENTERPOINT = "/"
  } = process.env;

  // setup gateway instance
  const gateway = await require("fastify")({ logger: DEBUG });

  // main handler
  const main = async (r, s) => {
    const {
      method,
      url,
      body = false,
    } = r;

    let { headers } = r;

    // check if url is set
    if (!headers["cors-url"]) s.send({error: 500, msg: "'cors-url' not set in headers", description: "'cors-url' is site path"});

    // create request data
    const rd = { method, url: headers["cors-url"], headers }

    // set body if set
    body && (rd.data = body)

    // change hostname
    headers['host'] = URL.parse(headers["cors-url"]).hostname

    // delete CORS-URL header for silent requests
    delete headers["cors-url"]

    // CORS injection
    headers['Access-Control-Allow-Origin'] = "*"
    
    await a(rd)
    .then(res => {
      const {
        data,
        status,
        headers,
      } = res;

      s
        .code(status)
        .headers(headers)
        .send(data)
    })
    .catch(console.log)
  }
  
  // on ready server
  const ready = (e) => {
    if (e) throw e;
  }

  // setup allowed method for requests
  ALOWED.toLowerCase().split(", ").forEach(method => gateway[method](ENTERPOINT, main))

  // Run the server!
  gateway.listen({ port: Number(PORT), host: String(HOST) },ready)
})();
