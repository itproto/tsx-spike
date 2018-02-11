const $tmplPage = content => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    </head>
    <body>
      <content>${content}</content>
  
      <!-- jQuery first, then Tether, then Bootstrap JS. -->
      <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    </body>
  </html>`;
};

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

const $routesForm = routes => {
  const $items = routes.map($itemRenderer).join("\n");
  return `
        <form method="post">
            <div class="list-group">
                ${$items}
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
};

module.exports = { $tmplPage, $routesForm };
