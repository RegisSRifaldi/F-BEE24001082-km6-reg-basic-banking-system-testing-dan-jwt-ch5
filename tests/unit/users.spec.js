const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createUser, getUserById } = require("../../services/users");

let user = {};

describe("test createUser()", () => {
  let name = "regis1";
  let email = "regis1@gmail.com";
  let password = "regis1";
  let identityType = "regis1";
  let identityNumber = "regis1";
  let address = "regis1";

  // remove all users
  beforeAll(async () => {
    await prisma.$transaction([
      // prisma.transaction.deleteMany(),
      // prisma.bankAccounts.deleteMany(),
      prisma.profile.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  });

  test("test email belum terdaftar -> sukses", async () => {
    try {
      let result = await createUser(
        name,
        email,
        password,
        identityType,
        identityNumber,
        address
      );
      user = result;

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name", name);
      expect(result).toHaveProperty("email", email);
      expect(result).toHaveProperty("password", password);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test email sudah terdaftar -> error", async () => {
    try {
      await createUser(
        name,
        email,
        password,
        identityType,
        identityNumber,
        address
      );
    } catch (err) {
      expect(err).toBe("email sudah dipakai");
    }
  });
});

describe("test getUserById(:id)", () => {
  test(" test cari user dengan id yang sudah terdaftar -> sukses", async () => {
    try {
      let result = await getUserById(user.id);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name", user.name);
      expect(result).toHaveProperty("email", user.email);
      expect(result).toHaveProperty("password", user.password);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test cari user dengan invalid id -> error", async () => {
    try {
      await getUserById(user.id * -1);
    } catch (err) {
      expect(err).toBe("id tidak terdaftar");
    }
  });
});
