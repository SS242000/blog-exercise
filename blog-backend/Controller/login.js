const { User, Blog, Comment } = require("../dbSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET1 = process.env.JWT_SECRET;

exports.ValidateUser = async (req, res) => {
  console.info("Hello World");
  const { email = null, password = null } = req.body || {};
  if (!email || !password) {
    return res.status(404).json({ error: "Email or password is missing" });
  }

  const usersQueryResponse = await User.findOne({
    where: {
      email: email,
      password_hash: password,
    },
  });
  if (usersQueryResponse) {
    const { dataValues = {} } = usersQueryResponse || {};
    const token = jwt.sign(dataValues, JWT_SECRET1, { expiresIn: "1h" });
    return res.status(200).json({
      message: "Login Success",
      token,
      data:dataValues,
    });
  } else {
    return res.status(404).json({ error: "Invalid username or password" });
  }
};
