const express = require("express");
const mongo = require("mongoose");

const userController = require("./controllers/userController");
mongo
  .connect("mongodb://localhost:27017/mypal", { useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.listen(3000);
    //////////////////////
    app.post("/user", userController.saveUser);
    app.get("/user", userController.getUser);
    /////////////////////
  })
  .catch((erro) => {
    console.log(erro);
  });
