const express = require("express");
const authenticationRouter = require("./src/routes/authentication.route");

const app = express();
app.use(express.json());

app.use("/auth", authenticationRouter);

app.listen(3001);
