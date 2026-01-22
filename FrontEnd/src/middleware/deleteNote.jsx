import axios from "axios";

const deleteNote = async ({ user, id }) => {
  console.log(user);
  
  const token = user.token;
  console.log(token);

  try {
    const response = await axios.delete(
      `http://localhost:5000/deleteNote/${id}`,
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

export default deleteNote;
