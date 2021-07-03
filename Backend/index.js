const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const port = 3000;

const app = express();
app.use(cors());
app.use(body.json());

app.listen(port);

app.post("/userLogin", (req, res) => {
  console.log(JSON.stringify(req.body));
  console.log(req.body);
  // res.send("helloo");
});
