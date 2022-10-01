require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

let refreshTokens = [];

app.post("/login", (request, response) => {
  const username = request.body.name;
  const user = {
    name: username,
  };

  // run node in terminal and then run
  // require('crypto').randomBytes(64).toString('hex')
  // to generate your own token and store it in .env file
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET);
  refreshTokens.push(refreshToken);

  response.json({
    accessToken,
    refreshToken,
  });
});

app.post("/refresh-token", (request, response) => {
  const refreshToken = request.body.refreshToken;
  if (refreshToken === null) return response.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return response.sendStatus(403);
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
    if (error) return response.body.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });

    return response.json({ accessToken });
  });
});

app.delete("/logout", (request, response) => {
  refreshTokens = refreshTokens.filter(
    (refreshToken) => refreshToken !== request.body.refreshToken
  );

  return response.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_LOGIN_SECRET, { expiresIn: "1m" });
}

app.listen(3001);
