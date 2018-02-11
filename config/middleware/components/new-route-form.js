const { $bsCard } = require("./utils");
const NEW_ROUTE_JSON = [
  {
    id: 1,
    name: "Item 1"
  },
  {
    id: 2,
    name: "Item 2"
  }
];

const pretify = json => JSON.stringify(json, undefined, 4);
const $newRouteForm = (route, json = NEW_ROUTE_JSON) => {
  return $bsCard(
    "New Route",
    "Add payload for new route (json array)",
    `
    <form method="post">
        <div class="form-group">
            <label for="routeName">Route Name</label>
            <input type="text" class="form-control" id="routeName" name="route" placeholder="Enter valid route (regex)" value="${route}">
        </div>
        <div class="form-group">
            <label for="json">Json Response</label>
            <textarea class="form-control" id="json" name="json" rows="10" cols="50" placeholder="Enter json [] response for route">${pretify(
              json
            )}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
  );
};

module.exports = { $newRouteForm };
