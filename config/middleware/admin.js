const shortid = require("shortid");
const uid = () => shortid.generate();
const { $adminForm } = require("./components/admin-form");
const { $bsPage } = require("./components/utils");

let items = [
  {
    url: "/foo",
    json: "Foo",
    err: undefined,
    id: uid(),
    meta: {
      proxy: true,
      mock: false
    }
  },
  {
    url: "/foo1",
    json: undefined,
    err: "Errq",
    id: uid(),
    meta: {
      proxy: false,
      mock: true
    }
  }
];
const { streamToString, parseQS, updateItems } = require("./utils");

const renderAdminGet = (req, res, items) => {
  const $res = $bsPage($adminForm(items));
  res.send($res);
};

const renderAdmin = (req, res) => {
  if (req.method === "POST") {
    streamToString(req, (err, formData) => {
      const formUpdate = parseQS(formData);
      items = updateItems(items, formUpdate);
      return renderAdminGet(req, res, items);
    });
  } else {
    return renderAdminGet(req, res, items);
  }
};

module.exports = {
  renderAdmin
};
