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

function _proxy(req, res, url, method, body) {
  const newUrl = "https://dog.ceo/api/" + url;
  console.info(newUrl);
  let r = request(newUrl);
  if (req.method === methods.POST) {
    r = request.post({ uri: newUrl, json: req.body });
  }

  req
    .pipe(r)
    .on("response", (response, body) => {
      if (response.statusCode !== 200) {
        console.warn("No resp");
        return;
      }
      streamToJson(response, json => {
        console.info(newUrl, json);
      });
    })
    .on("error", err => {
      console.error(err);
    })
    .pipe(res);
}

module.exports = function createServiceFacadeMiddleware(apiUrl) {
  const re = new RegExp(`/${apiUrl}/(.*)`);
  return async (req, res, next) => {
    const match = req.url.match(re);
    if (!match) {
      next();
      return;
    }

    const { method, body } = req;
    console.warn(match);
    const route = match[1];

    const savePath = path.join(__dirname, `${route}.json`);
    switch (method) {
      case methods.GET:
        _proxy(req, res, route);
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
