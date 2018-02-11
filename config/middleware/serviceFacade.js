const methods = {
  POST: "POST",
  GET: "GET"
};
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const { promisify } = require("util");

const { renderAdmin } = require("./admin");
const { proxyRoute } = require("./proxy");

const readFileAsync = promisify(fs.readFile);

const uid = () => shortid.generate();

const mapToArray = map => Array.from(map.entries());
const arrayToMap = arr => new Map(arr);
const savedUrls = new Map();

const createRoute = (route, err, json) => {
  return {
    id: uid(),
    route,
    err,
    lastUpdated: +new Date(),
    json
  };
};

const readMockFile = async route => {
  try {
    const filePath = path.join(
      __dirname,
      "resp",
      route.replace("/", "$") + ".json"
    );
    const text = await readFileAsync(filePath);
    return JSON.parse(text);
  } catch (err) {
    if (err.code === "ENOENT") {
      return ["No Mock"];
    }
    throw err;
  }
};

module.exports = function createServiceFacadeMiddleware(apiUrl) {
  const re = new RegExp(`/${apiUrl}/(.+)`);
  return async (req, res, next) => {
    const match = req.url.replace(/\/$/, "").match(re);
    if (!match) {
      next();
      return;
    }
    const { method, body } = req;
    const route = match[1];

    if (route.match("admin")) {
      return renderAdmin(req, res);
    }
    const savePath = path.join(__dirname, `${route}.json`);
    switch (method) {
      case methods.GET:
        proxyRoute(req, res, route, async (err, json) => {
          savedUrls.set(route, createRoute(route));
          if (err) {
            const mjson = await readMockFile(route);
            return res.json(mjson);
          }

          console.info(JSON.stringify(mapToArray(savedUrls)));
        });
        return;
        break;
      case methods.POST:
        res.json({ error: "NOT_IML" });
        break;
      default:
        next();
    }
  };
};
