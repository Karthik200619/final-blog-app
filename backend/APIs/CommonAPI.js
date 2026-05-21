import exp from "express";
import { authenticate } from "../services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";

export const commonRouter = exp.Router();

// login
commonRouter.post("/login", async (req, res, next) => {
  try {
    let userCred = req.body;

    let { token, user } = await authenticate(userCred);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      message: "login success",
      payload: user,
    });
  } catch (err) {
    next(err);
  }
});


// logout
commonRouter.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});


// check auth
commonRouter.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "authenticated",
      payload: req.user,
    });
  }
);
