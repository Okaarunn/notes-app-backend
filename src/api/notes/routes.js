const routes = (handler) => [
  // get all data notes
  {
    method: "GET",
    path: "/notes",
    handler: handler.getNotesHandler,
  },

  // get data notes id
  {
    method: "GET",
    path: "/notes/{id}",
    handler: handler.getNoteByIdHandler,
  },

  // Post notes
  {
    method: "POST",
    path: "/notes",
    handler: handler.postNoteHandler,
  },

  // edit notes
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: handler.putNoteByIdHandler,
  },

  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: handler.deleteNoteByIdHandler,
  },
];

module.exports = routes;
