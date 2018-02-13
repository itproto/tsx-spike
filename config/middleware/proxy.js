const request = require("request");
const { streamToStringAsync } = require("./utils");

const proxyRoute = (req, res, route, cb) => {
  const newUrl = "https://dog.ceo/api/" + route;
  let r = request(newUrl);
  if (req.method === "POST") {
    r = request.post({ uri: newUrl, json: req.body });
  }

  req
    .pipe(r)
    .on("response", async response => {
      if (response.statusCode !== 200) {
        cb(response.statusCode, undefined);
        return;
      }
      try {
        const json = await streamToStringAsync(response);
        cb(undefined, JSON.parse(json));
      } catch (error) {
        cb(error);
      }
    })
    .on("error", err => cb(err, undefined));
  //.pipe(res);
};

module.exports = {
  proxyRoute
};
