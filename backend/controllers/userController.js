const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp=await bcrypt.hash(otp,10)
    user.otp = hashedOtp;

    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.otpExpire = otpExpire;

    await user.save();

    await sendEmail(
      user.email,
      "Verify your Email",
      `<h2>Hello ${user.name}</h2>
       <p>Your OTP is <b>${otp}</b></p>
       <p>This OTP expires in 10 minutes.</p>`
    );

    res.status(201).json({ message: "User registered. OTP sent to email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

