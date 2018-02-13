const { $bsPage, alert } = require("./components/utils");
const { $newRouteForm } = require("./components/new-route-form");
const { streamToStringAsync, parseQS } = require("./utils");
const { writeMockFile } = require("./mock");

const rndr = (res, route, $alert) => {
  return res.send($bsPage($newRouteForm(route), $alert));
};
const newRote = async (req, res) => {
  const route = req.query.route || "";
  if (req.method === "POST") {
    try {
      const formData = await streamToStringAsync(req);
      const { json: jsonStr, route } = parseQS(formData);
      const json = JSON.parse(jsonStr);
      await writeMockFile(route, json);
      return rndr(res, route, alert.$success());
    } catch (error) {
      return rndr(res, route, alert.$error("Unable to save"));
    }
  } else {
    return rndr(res, route);
  }
};

module.exports = {
  newRote
};
