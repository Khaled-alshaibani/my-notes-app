import axios from "axios";

const updateNote = async ({ user, note }) => {
  const token = user.token;
  const noteId = note._id;
  const userId = user.id;
  const body = { title: note.title, content: note.content, userId };

  //   console.log("body: ", body);
  //   console.log("id: ", id);
  //   console.log("token: ", token);

  try {
    const response = await axios.put(
      `http://localhost:5000/updateNote/${noteId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default updateNote;
