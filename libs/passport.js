const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { login } = require("../controllers/v1/authController");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  let user = await prisma.user.findFirst({ where: { id } });
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    login
  )
);

module.exports = passport;
