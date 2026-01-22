// * MODELS
import User from "../../models/user.model.js";

export const GetUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }
