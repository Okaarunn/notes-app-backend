const { nanoid } = require("nanoid");

const InvariantError = require("../../exceptions/InvariantError");

const NotFoundError = require("../../exceptions/NotFoundError");

class NotesService {
  constructor() {
    this._notes = [];
  }

  //   get all data notes

  getNotes() {
    return this._notes;
  }

  //   get note

  getNoteById(id) {
    const note = this._notes.filter((noteItem) => noteItem.id === id)[0];

    if (!note) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }
    return note;
  }

  //    add data notes

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const ifSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!ifSuccess) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return id;
  }

  //   edit data note

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError("Gagal memperbarui catatan, Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  //   delete data note

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError("Gagal menghapus catatan, Id tidak ditemukan");
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
