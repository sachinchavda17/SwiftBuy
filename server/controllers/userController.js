// import User from "../models/User.js";

import User from "../models/User.js";

// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json({ message: "User Updated", user });
//   } catch (err) {
//     console.error("Error in Update User : ", err.message);
//     res.status(501).json({ error: "INTERNAL SERVER ERROR" });
//   }
// };

// export const fetchUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json({ user });
//   } catch (err) {
//     console.error("Error in fetch user : ", err.message);
//     res.status(501).json({ error: "INTERNAL SERVER ERROR" });
//   }
// };


export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in fetch user:", error.message);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error in Fetch All Users : ", err.message);
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
