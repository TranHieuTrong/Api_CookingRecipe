const express = require("express");
const router = express.Router();
const UserController = require("../modules/user/UserController");
const UserModel = require("../modules/user/UserModel");

// Endpoint để lấy tất cả người dùng
router.get("/getUser", async function (req, res, next) {
  try {
    const users = await UserController.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Endpoint để đăng ký người dùng mới
router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }
    const user = await UserController.register(name, email, password);
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Endpoint để đăng nhập người dùng
router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserController.login(email, password);

    if (user) {
      res.status(200).json({ message: "Đăng nhập thành công", user });
    } else {
      res.status(401).json({ error: "Email hoặc mật khẩu không đúng." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
