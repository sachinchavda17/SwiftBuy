import User from "../models/User.js";

// Add new address
export const addAddressController = async (req, res) => {
  try {
    const { userId, phone, street, city, state, pincode, email } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found!" });

    // Create and save the new address
    const address = { phone, street, city, state, pincode, email };

    // Add the address to the user's addresses array
    user.addresses.push(address);
    await user.save();

    res.status(201).json({ address: user.addresses });
  } catch (err) {
    console.log("Error in adding address: ", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAddressController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found!" });

    const address = user.addresses;
    res.status(200).json(address);
  } catch (err) {
    console.log("Error in getting address: ", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
