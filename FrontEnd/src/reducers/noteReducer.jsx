const NotesReducer = (notes = [], action) => {
  switch (action.type) {
    case "Get":
      return Array.isArray(action.payload) ? action.payload : [];

    case "add":
      return [action.payload, ...notes];

    case "update":
      return notes.map((n) =>
        n._id === action.payload._id ? action.payload : n
      );

    case "delete":
      return notes.filter((n) => n._id !== action.payload);

    default:
      return notes;
  }
};

export default NotesReducer;
