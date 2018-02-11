const methods = {
  POST: "POST",
  GET: "GET"
};
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const { promisify } = require("util");

const request = require("request");
const { renderAdmin } = require("./admin");

const readFileAsync = promisify(fs.readFile);

const { streamToString } = require("./utils");

const uid = () => shortid.generate();

function _proxy(req, res, route, cb) {
  const newUrl = "https://dog.ceo/api/" + route;
  let r = request(newUrl);
  if (req.method === methods.POST) {
    r = request.post({ uri: newUrl, json: req.body });
  }

  req
    .pipe(r)
    .on("response", (response, body) => {
      if (response.statusCode !== 200) {
        cb(response.statusCode, undefined);
        return;
      }
      streamToString(response, (err, json) => cb(undefined, JSON.parse(json)));
    })
    .on("error", err => cb(err, undefined))
    .pipe(res);
}

const mapToArray = map => Array.from(map.entries());
const arrayToMap = arr => new Map(arr);
const savedUrls = new Map();
module.exports = function createServiceFacadeMiddleware(apiUrl) {
  const re = new RegExp(`/${apiUrl}/(.*)`);
  return async (req, res, next) => {
    const match = req.url.match(re);
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
        _proxy(req, res, route, (err, json) => {
          savedUrls.set(route, {
            id: uid,
            json,
            err,
            lastUpdated: +new Date()
          });

          console.info(JSON.stringify(mapToArray(savedUrls)));
        });
        return;
        try {
          const text = await readFileAsync(savePath);
          res.json(JSON.parse(text));
        } catch (err) {
          if (err.code === "ENOENT") {
            res.json([]);
            return;
          }
          throw err;
        }
        break;
      case methods.POST:
        res.json({ error: "NOT_IML" });
        break;
      default:
        next();
    }
  };
};
