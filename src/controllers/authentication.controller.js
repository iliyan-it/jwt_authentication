const jwt = require("jsonwebtoken");
const validator = require("deep-email-validator");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { storeUserInDB } = require("../services/db.service");

let refreshTokens = [];

async function register(request, response) {
  const { email, password } = request.body;
  const { valid, reason, validators } = await validator.validate(email);

  if (!valid) {
    console.error(validators[reason].reason);

    return response.status(400).send({
      message: "Invalid email address!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: hashedPassword,
  };

  try {
    const stored = await storeUserInDB(user);
    return response.status(201).send({
      email: stored.email,
      id: stored._id,
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message,
    });
  }
}

function login(request, response) {
  console.log("login");
  //   const { email, password } = request.body;

  //   // try to find user in db (fauna)
  //   // if found continue with token creation
  //   // if not return 400 (User not found)
  //   const user = {
  //     email: email,
  //     password: password,
  //   };

  //   // run node in terminal and then run
  //   // require('crypto').randomBytes(64).toString('hex')
  //   // to generate your own token and store it in .env file
  //   const accessToken = generateAccessToken(user);
  //   const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET);
  //   refreshTokens.push(refreshToken);

  //   response.json({
  //     accessToken,
  //     refreshToken,
  //   });
}

function refreshToken(request, response) {
  console.log("refreshToken");
  //   const refreshToken = request.body.refreshToken;
  //   if (refreshToken === null) return response.sendStatus(401);
  //   if (!refreshTokens.includes(refreshToken)) return response.sendStatus(403);
  //   jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
  //     if (error) return response.body.sendStatus(403);
  //     const accessToken = generateAccessToken({ name: user.name });

  //     return response.json({ accessToken });
  //   });
}

function logout(request, response) {
  console.log("logout");
  //   refreshTokens = refreshTokens.filter(
  //     (refreshToken) => refreshToken !== request.body.refreshToken
  //   );

  //   return response.sendStatus(204);
}

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.JWT_LOGIN_SECRET, { expiresIn: "1m" });
// }

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
