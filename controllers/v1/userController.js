const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // menambahkan data user baru beserta dengan profilnya!
  store: async (req, res, next) => {
    let { name, email, password, identityType, identityNumber, address } =
      req.body;
    try {
      let userId = await prisma.user.findFirst({
        where: { email },
      });

      if (userId) {
        return res.status(400).json({
          status: false,
          message: `email: ${email}, telah digunakan sebelumnya!`,
        });
      }

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
          message: "Data harus diisi",
          data: null,
        });
      }

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

      res.status(201).json({
        status: true,
        message: "Berhasil membuat data",
        data: newUser,
      });
      return newUser;
    } catch (error) {
      next(error);
    }
  },

  // Menampilkan semua daftar user!
  // index: async (req, res, next) => {
  //   try {
  //     let users = await prisma.user.findMany();

  //     if (!users) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "data users tidak tersedia!",
  //         data: null,
  //       });
  //     }
  //     res.status(200).json({
  //       status: true,
  //       message: "Berhasil menampilkan semua data users",
  //       data: users,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // // 'improvisasi' menampilkan detail informasi user dengan tampilan detail profilnya!
  // index2: async (req, res, next) => {
  //   try {
  //     let users = await prisma.user.findMany({
  //       include: {
  //         profile: true,
  //       },
  //     });

  //     if (!users) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "data users tidak tersedia!",
  //         data: null,
  //       });
  //     }
  //     res.status(200).json({
  //       status: true,
  //       message: "Berhasil menampilkan semua data users",
  //       data: users,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // // menampilkan detail informasi user dengan menampilkan juga profilnya!
  // show: async (req, res, next) => {
  //   try {
  //     let id = Number(req.params.id);
  //     let users = await prisma.user.findUnique({
  //       where: { id },
  //       include: {
  //         profile: true,
  //       },
  //     });

  //     if (!users) {
  //       return res.status(400).json({
  //         status: false,
  //         message: `Tidak dapat menemukan user dengan id ${id}`,
  //         data: null,
  //       });
  //     }

  //     res.status(200).json({
  //       status: true,
  //       message: `Berhasil, menampilkan data user dengan id ${id}`,
  //       data: users,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
