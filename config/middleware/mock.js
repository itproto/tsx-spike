const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const getMockPath = route =>
  path.join(__dirname, "resp", route.replace(/\//g, "$") + ".json");

const readMockFile = async route => {
  try {
    const filePath = getMockPath(route);
    const text = await readFileAsync(filePath);
    return JSON.parse(text);
  } catch (err) {
    if (err.code === "ENOENT") {
      return undefined;
    }
    throw err;
  }
};
const writeMockFile = async (route, json) => {
  try {
    const filePath = getMockPath(route);
    const content = JSON.stringify(json, undefined, "\t");
    await writeFileAsync(filePath, content);
  } catch (err) {
    throw err;
  }
};

module.exports = { readMockFile, writeMockFile };
