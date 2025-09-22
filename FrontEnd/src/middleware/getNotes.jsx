import axios from "axios";
const GetNotes = async () => {

  const user = JSON.parse(localStorage.getItem("currentUser"))

  const userId = user.id

  const response = await axios.get(`http://localhost:5000/users/${userId}/notes`);
  return response.data;
};

export default GetNotes;
