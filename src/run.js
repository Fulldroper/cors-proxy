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
    ENTERPOINT = "*"
  } = process.env;

  // setup gateway instance
  const gateway = await require("fastify")({ logger: DEBUG,  });

  gateway.register(await require("@fastify/cors"), {
    origin: true, // дозволяє запити з будь-якого джерела
    methods: "*",
    exposedHeaders: "*",
    allowedHeaders: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  // main handler
  const main = async (r, s) => {
    const {
      method,
      url,
      body = false,
      params = false
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

    // ignore headers checking
    headers["cors-ignore"].toLowerCase().split(", ").forEach(header => delete headers[header]);

    // delete CORS-URL header for silent requests
    delete headers["cors-url"]
    delete headers["origin"]
    delete headers["referer"]

    console.log(rd); 
    await a(rd)
    .then(res => {
      const {
        data,
        status,
        headers,
      } = res;
      
      // CORS injection
      headers['Access-Control-Allow-Origin'] = "*"
      
      s
        .code(status)
        .headers(headers)
        .send(data)
    })
    .catch(async e => {
      s
        .code(e.response.code)
        .headers(e.response.headers)
        .send(e.response.data)
    })
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
