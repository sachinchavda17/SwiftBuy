import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, gender } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const userObject = newUser.toObject();
    delete userObject.password;

    res.status(201).json({ user: userObject, token });
  } catch (err) {
    console.error("Error in signup", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({ user: userObject, token });
  } catch (err) {
    console.error("Error in login", err.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
