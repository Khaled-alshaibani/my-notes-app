import axios from "axios";

const updateNote = async ({ token, noteID, title, content }) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/updateNote/${noteID}`,
      { title, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error occurred:", e.response?.data || e.message);
    throw e;
  }
};

export default updateNote;
