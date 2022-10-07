const express = require("express");
require("dotenv-flow").config();

const app = express();
app.use(express.json());
app.listen(3001);

const authenticationRouter = require("./src/routes/authentication.route");
app.use("/auth", authenticationRouter);
