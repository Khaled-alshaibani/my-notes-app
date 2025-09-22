import axios from "axios";

const sign_in = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/Login", {
      email: email,
      password: password,
    });

    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    console.log(`error occured: ${e}`);
    throw e;
  }
};

export default sign_in;
