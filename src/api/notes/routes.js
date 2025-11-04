const routes = (handler) => [
  // get all data notes
  {
    method: "GET",
    path: "/notes",
    handler: () => handler.getNotesHandler(),
  },

  // get data notes id
  {
    method: "GET",
    path: "/notes/{id}",
    handler: (request, h) => handler.getNoteByIdHandler(request, h),
  },

  // Post notes
  {
    method: "POST",
    path: "/notes",
    handler: (request, h) => handler.postNoteHandler(request, h),
  },

  // edit notes
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: (request, h) => handler.putNoteByIdHandler(request, h),
  },

  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: (request, h) => handler.deleteNoteByIdHandler(request, h),
  },
];

module.exports = routes;
