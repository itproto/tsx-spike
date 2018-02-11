const shortid = require("shortid");
const uid = () => shortid.generate();
const { $tmplPage, $routesForm } = require("./admin-form");
const arrToObject = (arr, prop) => {
  return arr.reduce((res, item) => {
    res[item[prop]] = item;
    return res;
  }, {});
};

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
const { streamToString, parseQS, getIn } = require("./utils");

const updateItems = (items, formUpdate) => {
  //parse form {'uid1_proxy': 'on', 'uid2_mock': 'on'} => {uid1: {proxy: true}, ...}
  //parses only checkboxes
  const flags = Object.keys(formUpdate).reduce((res, key) => {
    const matches = key.match(/^(.+)_(\w+)$/);
    if (!matches) {
      return res;
    }
    const [, id, metaProp] = matches;
    res[id] = res[id] || [];
    res[id][metaProp] = true;
    return res;
  }, {});

  return items.map(item => {
    return {
      ...item,
      meta: {
        proxy: getIn(item.id, "proxy")(flags),
        mock: getIn(item.id, "mock")(flags)
      }
    };
  });
};

const renderAdminGet = (req, res, items) => {
  const $res = $tmplPage($routesForm(items));
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
