module.exports = function create(apiUrl) {
  const re = new RegExp(`/${apiUrl}/(.+)`);
  return async function(req, res, next) {
    const match = req.url.replace(/\/$/, "").match(re);
    if (!match) {
      next();
      return;
    }
    // const { method } = req;
    const route = match[1];

    const allModels = ["users", "posts", "comments"];
    for (const modelName of allModels) {
      const result = matchResource(modelName, route, res);
      if (result) {
        return result;
      }
    }
    return res.send(404);
  };
};

function matchResource(modelName, route, res) {
  let models = require(`./${modelName}`);
  let reModelById = new RegExp(`${modelName}\\/(.+)`);
  let match_ = route.match(reModelById);

  if (match_) {
    const idParam = match_[1];
    const found = models.find(({ id }) => id.toString() === idParam);
    return res.json(found);
  } else if (route.match(modelName)) {
    return res.json(models);
  }
  return undefined;
}
