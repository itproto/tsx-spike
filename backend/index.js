const path = require("path");
const express = require("express");
const graphqlExpress = require("express-graphql");

const app = express();
app.use("/q", () => {});

app.use("/dist", () => {});
app.use("*", {});

const PORT = 9999;
app.listen(PORT, () => console.log(`Run on ${PORT}`));
