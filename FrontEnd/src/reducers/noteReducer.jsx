const NotesReducer = (notes = [], action) => {
  switch (action.type) {
    case "Get":
      return Array.isArray(action.payload) ? action.payload : notes;

    case "add":
      return [action.payload, ...notes];

    case "update":
      console.log(action);
      return notes.map((n) =>
        n._id === action.payload.note._id ? action.payload.note : n,
      );

    case "delete":
      return notes.filter((n) => n.id !== action.payload);

    case "clear":
      return [];

    default:
      return notes;
  }
};

export default NotesReducer;
