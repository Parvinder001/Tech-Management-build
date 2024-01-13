const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuthantication = async (request, response, Next) => {
  const token = request.header("Authorization");
  if (!token) {
    response
      .status(401)
      .json({ message: "Unauthrization HTTP, Token not provided" });
  }
  const userToken = token.replace("Bearer ", "");
  const user = jwt.verify(userToken, process.env.JWT_SECRET_KEY);

  try {
    const UserData = await User.findOne({ email: user.email }).select({
      password: 0,
    });
    request.user = UserData;
    request.token = token;
    request.userID = UserData._id;
    Next();
  } catch (error) {
    response.status(401).json({ success: false, error: error });
  }
};

module.exports = userAuthantication;
