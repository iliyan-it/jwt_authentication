const jwt = require("jsonwebtoken");
const validator = require("deep-email-validator");
const bcrypt = require("bcrypt");
const axios = require("axios");

let refreshTokens = [];

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

function register(request, response) {
  console.log("register");
  //   const { email, password } = request.body;
  //   const { valid, reason, validators } = await validator.validate(email);

  //   if (!valid) {
  //     console.error(validators[reason].reason);

  //     return response.status(400).send({
  //       message: "Invalid email address!",
  //     });
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = {
  //     email: email,
  //     password: hashedPassword,
  //   };

  //   const stored = await storeUserInDB(user);

  //   // store the new user in the DB(fauna) email, password, with the salt(jwt secret)

  //   console.log(stored);
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

// async function storeUserInDB(user) {
//   try {
//     const { data } = await axios({
//       url: "https://graphql.eu.fauna.com/graphql",
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
//       },
//       data: {
//         query: `mutation($email: String!, $password: String!){
//             createUser(data:{email: $email, password: $password}) {
//               _id, email, password
//             }
//         }`,
//         variables: user,
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
