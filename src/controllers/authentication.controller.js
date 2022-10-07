const jwt = require("jsonwebtoken");
const { createClient } = require("redis");
const validator = require("deep-email-validator");
const bcrypt = require("bcrypt");
const BadRequest = require("../errors/BadRequest.error");
const Unauthorized = require("../errors/UnauthorizedRequest.error");
const { storeUserInDB } = require("../services/db.service");
const {
  validateUser,
  generateAccessToken,
} = require("../services/users.service");

const client = createClient();
(async () => {
  await client.connect();
})();

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
      email: stored.createUser.email,
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message,
    });
  }
}

async function login(request, response) {
  const { email, password } = request.body;

  try {
    const user = await validateUser(email, password);

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET);

    client.set(`refresh-token-${user.email}`, refreshToken);

    response.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error)
    if (error instanceof Unauthorized || error instanceof BadRequest) {
      return response.sendStatus(error.status);
    } else {
      return response.sendStatus(400);
    }
  }
}

async function logout(request, response) {
  const { email, password } = request.body;

  try {
    const user = await validateUser(email, password);
  } catch (error) {
    if (error instanceof Unauthorized || error instanceof BadRequest) {
      return response.sendStatus(error.status);
    } else {
      return response.sendStatus(400);
    }
  }

  client.del(`refresh-token-${user.email}`);

  return response.sendStatus(204);
}

function refreshToken(request, response) {
  const refreshToken = request.body.refreshToken;

  if (refreshToken === null) return response.sendStatus(401);
  if (!client.get(refreshToken)) return response.sendStatus(403);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
    if (error) return response.body.sendStatus(403);

    const accessToken = generateAccessToken({
      email: user.email,
      password: user.password,
    });

    return response.json({ accessToken });
  });
}

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
