const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");
const userController = require("./controllers/userController");
const dataController = require("./controllers/dataController");

mongo
  .connect("mongodb://localhost:27017/mypal", { useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.listen(3000, () => {
      console.log("Server Started..");
    });
    ///////////////////////////
    //////////USER////////////
    app.post("/user", userController.saveUser);
    app.get("/user", userController.getUser);
    app.get("/user/:email/:password", userController.getLoginDeatails);
    app.get("/user/:email", userController.getExistsEmail);
    /////////Data/////////
    app.post('/data',dataController.saveData)
    app.get('/data',dataController.getData)

    /////////////////////
  })
  .catch((erro) => {
    console.log(erro);
  });
