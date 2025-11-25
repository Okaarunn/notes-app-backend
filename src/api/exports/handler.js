const autoBind = require("auto-bind");
const ClientError = require("../../exceptions/ClientError");

class ExportNotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  //   post export notes

  async postExportNotesHandler(request, h) {
    // validate user payload

    this._validator.validateExportNotesPayload(request.payload);

    // obj msg will send in queue
    const message = {
      // get user id from credentials
      userId: request.auth.credentials.id,
      //   get target email from payload
      targetEmail: request.payload.targetEmail,
    };

    // send to queue
    await this._service.sendMessage("export:notes", JSON.stringify(message));

    const response = h.response({
      status: "success",
      message: "Permintaan Anda dalam antrean",
    });

    response.code(201);
    return response;
  }
}

module.exports = ExportNotesHandler;
