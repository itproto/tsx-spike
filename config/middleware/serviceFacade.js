const methods = {
  POST: "POST",
  GET: "GET"
};
const { cuid } = require("./utils");
const { readMockFile, writeMockFile } = require("./mock");
const { renderAdmin } = require("./admin");
const { proxyRoute } = require("./proxy");

const savedUrls = new Map();

const createRoute = (route, err, json) => {
  return {
    id: cuid(),
    route,
    err,
    lastUpdated: +new Date(),
    json
  };
};

const renderCreate = (req, res, route) => {
  return res.send(`<div>
       <h1>${route}</h1>
       <textarea>{'json': 'here'}</textarea>
    </div`);
};

module.exports = function createServiceFacadeMiddleware(apiUrl) {
  const re = new RegExp(`/${apiUrl}/(.+)`);
  return function(req, res, next) {
    const match = req.url.replace(/\/$/, "").match(re);
    if (!match) {
      next();
      return;
    }
    const { method } = req;
    const route = match[1];

    if (route.match("admin")) {
      return renderAdmin(req, res);
    }
    switch (method) {
      case methods.GET:
        proxyRoute(req, res, route, async (err, json) => {
          savedUrls.set(route, createRoute(route));
          if (err) {
            const mjson = await readMockFile(route);
            if (!json) {
              return renderCreate(req, res, route);
            }
            return res.json(mjson);
          }
          await writeMockFile(route, json);
          return res.json(json);
        });
        break;
      case methods.POST:
        res.json({ error: "NOT_IML" });
        break;
      default:
        next();
    }
  };
};
