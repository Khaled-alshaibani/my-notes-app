import axios from "axios";

const deleteNote = async ({ token, noteID, title, content }) => {
  const body = { title, content };

  try {
    const response = await axios.put("http://localhost:5000/updateNote", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id: noteID },
    });
    return response.data;
  } catch (e) {
    console.error("Error occurred:", e.response?.data || e.message);
    throw e;
  }
};

export default deleteNote;
