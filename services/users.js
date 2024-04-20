const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createUser: async (
    name,
    email,
    password,
    identityType,
    identityNumber,
    address
  ) => {
    try {
      let exist = await prisma.user.findUnique({ where: { email } });
      if (exist) throw "email sudah dipakai";

      let newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      let newProfile = await prisma.profile.create({
        data: {
          identity_type: identityType,
          identity_number: identityNumber,
          address: address,
          user: {
            connect: { id: newUser.id },
          },
        },
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      let result = await prisma.user.findUnique({
        where: { id: id },
        include: {
          profile: true,
        },
      });
      if (!result) throw "id tidak terdaftar";

      return result;
    } catch (error) {
      throw error;
    }
  },
};
