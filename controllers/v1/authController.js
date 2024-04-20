const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
  register: async (req, res, next) => {
    try {
      let { name, email, password, identityType, identityNumber, address } =
        req.body;

      if (
        !name ||
        !email ||
        !password ||
        !identityType ||
        !identityNumber ||
        !address
      ) {
        return res.status(400).json({
          status: false,
          message:
            "name, email, password, identityType, identityNumber, and address are required!",
          data: null,
        });
      }

      let exist = await prisma.user.findFirst({ where: { email } });
      if (exist) {
        return res.status(400).json({
          status: false,
          message: "email has already been used!",
          data: null,
        });
      }

      let encryptedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { name, email, password: encryptedPassword },
      });

      // res.json({
      //   status: true,
      //   message: "OK",
      //   data: user,
      // });

      return res.redirect("/login");
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "email and password are required!",
          data: null,
        });
      }

      let user = await prisma.user.findFirst({ where: { email } });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "invalid email or password!",
          data: null,
        });
      }

      let isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          status: false,
          message: "invalid email or password!",
          data: null,
        });
      }

      delete user.password;
      let token = jwt.sign(user, JWT_SECRET);

      res.json({
        status: true,
        message: "OK",
        data: { ...user, token },
      });

      // return done(null, user);
    } catch (error) {
      next(error);
    }
  },

  authenticate: async (req, res, next) => {
    try {
      res.json({
        status: true,
        message: "OK",
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
};
