const { $bsPage, alert } = require("./components/utils");
const { $newRouteForm } = require("./components/new-route-form");
const { streamToString, parseQS } = require("./utils");
const { writeMockFile } = require("./mock");
const rndr = (res, route, $alert) => {
  return res.send($bsPage($newRouteForm(route), $alert));
};
const newRote = (req, res) => {
  const route = req.query.route || "";
  if (req.method === "POST") {
    streamToString(req, async (err, formData) => {
      const { json: jsonStr, route } = parseQS(formData);
      const json = JSON.parse(jsonStr);
      await writeMockFile(route, json);

      return rndr(res, route, alert.$success());
    });
  } else {
    return rndr(res, route);
  }
};

module.exports = {
  newRote
};
