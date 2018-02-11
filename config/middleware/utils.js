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

module.exports = { streamToString, parseQS, getIn };
