const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

exports.registerUser = async (req, res) => {
  const { username, email, password, profileImageUrl } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  // Check if user already exists (dummy check for example)
  try{
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ username, email, password, profileImageUrl });
    res.status(201).json({
        id: user._id,
        user,
        token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" , error: error.message });
  }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
        }
    
        res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

