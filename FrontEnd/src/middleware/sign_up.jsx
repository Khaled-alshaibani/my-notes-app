import React from "react";
import axios from "axios";

const sign_up = async (userName, email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/SignUp", {
      userName: userName,
      email: email,
      password: password,
    });

    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (e) {
    console.log(`error occured: ${e}`);
  }
};

export default sign_up;
