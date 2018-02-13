const methods = {
  POST: "POST",
  GET: "GET"
};
const { cuid } = require("./utils");
const { readMockFile, writeMockFile } = require("./mock");
const { renderAdmin } = require("./admin");
const { newRote } = require("./new-route");
const { proxyRoute } = require("./proxy");

const { promisify } = require("util");
const proxyRouteAsync = promisify(proxyRoute);

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
  return async function(req, res, next) {
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
    let json;
    switch (method) {
      case methods.GET:
      case methods.POST:
        try {
          json = await proxyRouteAsync(req, res, route); //, async (err, json) => {
          savedUrls.set(route, createRoute(route));
          await writeMockFile(route, json);
          return res.json(json);
        } catch (error) {
          const mjson = await readMockFile(route);
          if (!json && !mjson) {
            return res.redirect(`admin/newRoute?route=${route}`);
          }
          return res.json(json || mjson); //TODO:
        }
      default:
        next();
    }
  };
};
