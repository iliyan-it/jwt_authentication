const FIND_USER_BY_EMAIL = `query($email: String!){
    userByEmail(email: $email) {
      data {email, password}
    }
}`;

module.exports = {
  FIND_USER_BY_EMAIL,
};
