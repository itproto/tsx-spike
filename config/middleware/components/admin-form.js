const { $bsCard } = require("./utils");
const $itemRenderer = ({ url, id, meta }) => {
  return `
    <div class="list-group-item justify-content-between">
        <div class="input-group">
          <span class="input-group-addon"><label><input name="${id}_proxy" type="checkbox"
           ${meta.proxy ? "checked" : ""}></label> proxy</span>
          <span class="input-group-addon"><label><input name="${id}_mock" type="checkbox"
           ${meta.mock ? "checked" : ""}></label> mock</span>
          <input type="text" class="form-control" value="${url}">
        </div>
    </div>`;
};

const $adminForm = routes => {
  const $items = routes.map($itemRenderer).join("\n");
  return $bsCard(
    "Routes admin",
    "",
    `
        <form method="post">
        <div class="form-group">
            <label for="json">Json Response</label>
            <div class="form-group">
                ${$items}
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `
  );
};

module.exports = { $adminForm };
