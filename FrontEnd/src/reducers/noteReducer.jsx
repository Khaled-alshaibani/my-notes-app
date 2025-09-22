const NotesReducer = (notes = [], action) => {
  switch (action.type) {
    case "Get":
      notes = action.payload.data;
      
      
      return notes;

    default:
      break;
  }
};

export default NotesReducer;
