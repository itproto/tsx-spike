const request = require("request");
const { streamToString } = require("./utils");

function proxyRoute(req, res, route, cb) {
  const newUrl = "https://dog.ceo/api/" + route;
  let r = request(newUrl);
  if (req.method === "POST") {
    r = request.post({ uri: newUrl, json: req.body });
  }

  req
    .pipe(r)
    .on("response", response => {
      if (response.statusCode !== 200) {
        cb(response.statusCode, undefined);
        return;
      }
      streamToString(response, (err, json) => cb(undefined, JSON.parse(json)));
    })
    .on("error", err => cb(err, undefined));
  //.pipe(res);
}

module.exports = {
  proxyRoute
};
