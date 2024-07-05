import User from "../models/User.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "User Updated", user });
  } catch (err) {
    console.error("Error in Update User : ", err.message);
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error in fetch user : ", err.message);
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
