const autoBind = require("auto-bind");

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    // mem-bind nilai this untuk seluruh method sekaligus
    autoBind(this);

    // this.postNoteHandler = this.postNoteHandler.bind(this);
    // this.getNotesHandler = this.getNotesHandler.bind(this);
    // this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    // this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    // this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  // get note service
  async getNotesHandler() {
    const notes = await this._service.getNotes();

    return {
      status: "success",
      data: {
        notes,
      },
    };
  }

  // get detail note service
  async getNoteByIdHandler(request, h) {
    const { id } = request.params;
    const note = await this._service.getNoteById(id);
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  // post note service
  async postNoteHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { title = "untitled", body, tags } = request.payload;

    const noteId = await this._service.addNote({ title, body, tags });

    return h
      .response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId,
        },
      })
      .code(201);
  }

  // edit note service
  async putNoteByIdHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;

    await this._service.editNoteById(id, request.payload);

    return {
      status: "success",
      message: "Catatan berhasil diperbarui",
    };
  }

  // delete note service
  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteNoteById(id);
    return {
      status: "success",
      message: "Catatan berhasil dihapus",
    };
  }
}

module.exports = NotesHandler;
