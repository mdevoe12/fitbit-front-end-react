module.exports = {
  context: __dirname + "/app",

  entry: "./app.js",
  externals: ['axios'],
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  }
};
