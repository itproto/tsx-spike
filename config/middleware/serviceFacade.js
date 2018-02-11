const methods = {
  POST: "POST",
  GET: "GET"
};
const { cuid } = require("./utils");
const { readMockFile, writeMockFile } = require("./mock");
const { renderAdmin } = require("./admin");
const { newRote } = require("./new-route");
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

    if (route.match("admin/newRoute")) {
      return newRote(req, res);
    }
    if (route.match("admin")) {
      return renderAdmin(req, res);
    }
    switch (method) {
      case methods.GET:
      case methods.POST:
        proxyRoute(req, res, route, async (err, json) => {
          savedUrls.set(route, createRoute(route));
          if (err) {
            const mjson = await readMockFile(route);
            if (!json && !mjson) {
              return res.redirect(`admin/newRoute?route=${route}`);
            }
            return res.json(json || mjson); //TODO:
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
