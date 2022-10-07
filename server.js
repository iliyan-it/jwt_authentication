require("dotenv-flow").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const albums = [
  { title: "The Stage", band: "Avenged Sevenfold" },
  { title: "The number of the beast", band: "Iron Maiden" },
  { title: "The Black Album", band: "Metallica" },
];

app.get("/albums", authenticateToken, (request, response) => {
  return response.json({ albums });
});

function authenticateToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return response.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_LOGIN_SECRET, (error, user) => {
    if (error) return response.json(error);

    request.user = user;
    next();
  });
}

app.listen(3000);
