const { findUserByEmail } = require("./db.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BadRequest = require("../errors/BadRequest.error");
const Unauthorized = require("../errors/UnauthorizedRequest.error");

async function validateUser(email, password) {
  if (!email || !password) {
    throw new BadRequest();
  }

  try {
    const user = await findUserByEmail(email);

    if (
      typeof user === "undefined" ||
      !bcrypt.compareSync(password, user.password)
    ) {
      throw new Unauthorized();
    }

    return user;
  } catch (error) {
    throw new Unauthorized();
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_LOGIN_SECRET, { expiresIn: "10m" });
}

module.exports = { validateUser, generateAccessToken };
