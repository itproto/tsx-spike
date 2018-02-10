const methods = {
  POST: "POST",
  GET: "GET"
};
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const request = require("request");

const readFileAsync = promisify(fs.readFile);
function streamToJson(stream, cb) {
  const chunks = [];
  stream.on("data", chunk => {
    chunks.push(chunk.toString());
  });
  stream.on("end", () => {
    cb(JSON.parse(chunks.join("")));
  });
}

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
      streamToJson(response, json => cb(undefined, json));
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

    const savePath = path.join(__dirname, `${route}.json`);
    switch (method) {
      case methods.GET:
        _proxy(req, res, route, (err, json) => {
          savedUrls.set(route, {
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
