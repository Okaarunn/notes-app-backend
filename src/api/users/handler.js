const autoBind = require("auto-bind");

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  // Post data user

  async postUserHandler(request, h) {
    // validate payload
    this._validator = validateUserPayload(request.payload);

    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({
      username,
      password,
      fullname,
    });

    return h
      .response({
        status: "success",
        message: "User berhasil ditambahkan",
        data: {
          userId,
        },
      })
      .code(201);
  }

  // Get data user by id

  async getUserByIdHandler(request, h) {
    const id = request.params;

    const user = await this._service.getUserByIdHandler(id);

    return {
      status: "success",
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
