const express = require("express");
const app = express();
const port = 3000;
require("./connection/conn");

const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(port, () => {
  console.log(`Example app listening on port`);
});
