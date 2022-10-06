const axios = require("axios");
require("dotenv-flow").config();

async function storeUserInDB(user) {
  try {
    const {
      data: { data, errors },
    } = await axios({
      url: "https://graphql.eu.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: `mutation($email: String!, $password: String!){
            createUser(data:{email: $email, password: $password}) {
              _id, email, password
            }
        }`,
        variables: user,
      },
    });

    if (errors) {
      //TODO Log actual message
      console.error(errors);
      throw new Error("Something has failed while trying to store data in DB!");
    }

    return {
      user: { id: data.createUser._id, email: data.createUser.email },
    };
  } catch (error) {
    //TODO log actual message
    console.error(error);
    throw new Error("Something has failed while trying to store data in DB!");
  }
}

module.exports = {
  storeUserInDB,
};
