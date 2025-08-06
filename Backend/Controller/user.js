import { User } from "../Model/user.js";

const getUser = async (req, res) => {
  try {
    const { name, email, age, password, role } = req.body;

    const newUser = new User({ name, email, age, password, role });

    if (!name || !email || !age || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    if (age < 0) {
      return res.status(400).json({ message: "Age must be a positive number" });
    }
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default getUser;




export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




//get user by ID



export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {   
    console.error("❌ Error fetching user by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }     
}



//update 

export const Updateuser = async (req, res) => {
    try {
        const userId = req.params.id;
       
        const { name, email, age, password, role } = req.body;
        const user = await User.findByIdAndUpdate(userId ,
            { name, email, age, password, role },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
        res.status(200).json({ message: "User updated successfully", user });

    } catch (err) {
        console.error("❌ Error updating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {    
      return res.status(404).json({ message: "User not found" });
    }       
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {   
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
    }

    }