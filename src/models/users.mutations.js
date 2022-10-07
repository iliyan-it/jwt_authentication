const STORE_USER_MUTATION = `mutation($email: String!, $password: String!){
    createUser(data:{email: $email, password: $password}) {
    email, password
}
}`;

module.exports = {
    STORE_USER_MUTATION
};
