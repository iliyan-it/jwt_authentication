class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.status = 401;
  }
}

module.exports = Forbidden;
