const routes = (handler) => [
  // get all data notes
  {
    method: "GET",
    path: "/notes",
    handler: handler.getNotesHandler,
    options: {
      auth: "notesapp_jwt",
    },
  },

  // get data notes id
  {
    method: "GET",
    path: "/notes/{id}",
    handler: handler.getNoteByIdHandler,
    options: {
      auth: "notesapp_jwt",
    },
  },

  // Post notes
  {
    method: "POST",
    path: "/notes",
    handler: handler.postNoteHandler,
    options: {
      auth: "notesapp_jwt",
    },
  },

  // edit notes
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: handler.putNoteByIdHandler,
    options: {
      auth: "notesapp_jwt",
    },
  },

  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: handler.deleteNoteByIdHandler,
    options: {
      auth: "notesapp_jwt",
    },
  },
];

module.exports = routes;
