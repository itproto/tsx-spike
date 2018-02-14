const { $adminForm } = require("./components/admin-form");
const { $bsPage, alert } = require("./components/utils");

const { parseQS, updateItems, streamToStringAsync } = require("./utils");
const { getModel } = require("./routeSettings");

const renderAdminGet = (req, res, items, $alert) => {
  const $res = $bsPage($adminForm(items), $alert);
  res.send($res);
};

const renderAdmin = async (req, res) => {
  const items = await getModel();
  if (req.method === "POST") {
    try {
      const formData = await streamToStringAsync(req);
      const formUpdate = parseQS(formData);
      items = updateItems(items, formUpdate);
      return renderAdminGet(req, res, items, alert.$success());
    } catch (err) {
      return renderAdminGet(req, res, items, alert.$error(err));
    }
  } else {
    return renderAdminGet(req, res, items);
  }
};

module.exports = {
  renderAdmin
};
