class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 403;
  }
}

module.exports = Unauthorized;
