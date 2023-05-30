require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/participants";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cors()); // adicionado essa linha para resolver error de cors

mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log("Conectado ao banco de dados MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor pronto em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados MongoDB:", error);
  });
