
import  Jwt  from "jsonwebtoken";
import Users from "../model/userModel";

// For operations made by only admin

export const adminAuthorization = async (req, res, next) => {
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
        message: "You are not logged in. Please, login",
      });
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const logedInUser = await Users.findById(decoded.id);

    if (!logedInUser) {
      res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    }

    if (logedInUser.role !== "admin") {
      res.status(401).json({
        status: "401",
        message: "Only admin can do this operation",
      });
    } else {
      req.Users = logedInUser;
      next();
    }

  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

// Other operations that requires only login

export const normalUserAuthentication = async (req, res, next) => {
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
        message: "This operation requires you to login",
      });
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);

    if (!loggedInUser) {
      res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }

  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};







