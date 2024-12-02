const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Регистрация пользователя
router.post(
  "/register",
  body("name")
    .isLength({ min: 2 })
    .withMessage("Имя должно быть не короче 2 символов"),
  body("email").isEmail().withMessage("Введите корректный email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Минимум 6 символов в пароле"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: "Пользователь создан", userId: user.id });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ error: "Пользователь с таким email уже существует" });
      }
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
);

// Логин пользователя
router.post(
  "/login",
  body("email").isEmail().withMessage("Введите корректный email"),
  body("password").notEmpty().withMessage("Введите пароль"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      // Проверяем пароль
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      // Генерируем токен
      const token = jwt.sign({ userId: user.id }, "secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Что-то пошло не так" });
    }
  }
);

module.exports = router;
