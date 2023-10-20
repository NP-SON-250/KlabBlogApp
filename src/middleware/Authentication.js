
import  Jwt  from "jsonwebtoken";
import Users from "../model/userModel";
const Authorization = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        status: "401",
        message: "You Are Not Logged In Please login",
      });
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const logedUser = await Users.findById(decoded.id);

    if (!logedUser) {
      res.status(403).json({
        status: "403",
        message: "Token has Expired Please login Again",
      });
    }

    if (logedUser.Role !== "admin") {
      res.status(401).json({
        status: "401",
        message: "Only Admin can do this operation",
      });
    } else {
      req.Users = logedUser;
      next();
    }

  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

export default Authorization;





