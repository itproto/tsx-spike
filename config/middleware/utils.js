const shortid = require("shortid");

function streamToString(stream, cb) {
  const chunks = [];
  return stream
    .on("data", chunk => {
      chunks.push(chunk.toString());
    })
    .on("end", () => {
      cb(undefined, chunks.join(""));
    });
}

const parseQS = qs => {
  if (qs === "") {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURI(qs)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

const getIn = (...p) => o =>
  p.reduce((xs, x) => (xs && xs[x] ? xs[x] : undefined), o);

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

const arrToObject = (arr, prop) => {
  return arr.reduce((res, item) => {
    res[item[prop]] = item;
    return res;
  }, {});
};

const cuid = () => shortid.generate();
const mapToArray = map => Array.from(map.entries());
const arrayToMap = arr => new Map(arr);

module.exports = {
  streamToString,
  parseQS,
  getIn,
  updateItems,
  cuid,
  arrToObject,
  mapToArray,
  arrayToMap
};
