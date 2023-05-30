const express = require("express");
const cors = require("cors");
const app = express();
const participantsRoutes = require("./src/routes/participantsRoutes");

app.use(cors()); // Adicione essa linha para resolver o erro de CORS
app.use(express.json());
app.use("/participants", participantsRoutes);

module.exports = app;
