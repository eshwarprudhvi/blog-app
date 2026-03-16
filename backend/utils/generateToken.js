import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure:true,
    sameSite:"none",
    maxAge: 7 * 1440 * 60,
  });
  return token;
};

export default generateToken;
