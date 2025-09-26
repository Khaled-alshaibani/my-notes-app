import axios from "axios";

const addNote = async ({ user, title, content }) => {
  const token = user.token;
  const body = { title, content };

  try {
    const response = await axios.post(`http://localhost:5000/addNote`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error occurred:", e.response?.data || e.message);
    throw e;
  }
};

export default addNote;
