const axios = require("axios");
const { STORE_USER_MUTATION } = require("../models/users.mutations");
const { FIND_USER_BY_EMAIL } = require("../models/users.queries");

async function storeUserInDB(user) {
  try {
    const {
      data: { data, errors },
    } = await axios({
      url: process.env.FAUNA_URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: STORE_USER_MUTATION,
        variables: user,
      },
    });

    if (errors) {
      logError(errors);
    }

    return data;
  } catch (error) {
    logError(error);
  }
}

async function findUserByEmail(email) {
  try {
    const {
      data: {
        data: {
          userByEmail: { data: user },
        },
      },
    } = await axios({
      url: process.env.FAUNA_URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: FIND_USER_BY_EMAIL,
        variables: { email: email },
      },
    });

    return user.pop();
  } catch (error) {
    logError(error);
  }
}

function logError(error) {
  console.error(error);
  throw new Error("Something has failed while trying to store data in DB!");
}

module.exports = {
  storeUserInDB,
  findUserByEmail,
};
