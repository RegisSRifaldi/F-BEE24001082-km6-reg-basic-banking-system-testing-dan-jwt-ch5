const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // menambahkan akun baru ke user yang sudah didaftarkan!
  store: async (req, res, next) => {
    try {
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      let accountId = await prisma.user.findFirst({
        where: { id: user_id },
      });

      if (!accountId) {
        return res.status(404).json({
          status: false,
          message: `user dengan id ${id}, sudah memiliki nomor akun!`,
          data: null,
        });
      } else {
        if (!user_id || !bank_name || !bank_account_number || !balance) {
          return res.status(400).json({
            status: false,
            message: "Data akun harus diisi!",
            data: null,
          });
        }
      }

      let accountNumber = await prisma.bankAccounts.findFirst({
        where: {
          bank_account_number,
        },
      });

      if (accountNumber) {
        return res.status(404).json({
          status: false,
          message: `User dengan id ${user_id} sudah memiliki nomor akun.!`,
          dana: null,
        });
      }

      let account = await prisma.bankAccounts.create({
        data: {
          user_id,
          bank_name,
          bank_account_number,
          balance,
        },
        include: {
          user: true,
        },
      });

      res.status(201).json({
        status: true,
        message: "Berhasil, membuat data!",
        data: account,
      });
    } catch (error) {
      next(error);
    }
  },

  // menampilkan daftar akun!
  index: async (req, res, next) => {
    try {
      let accounts = await prisma.bankAccounts.findMany();

      if (!accounts) {
        return res.status(404).json({
          status: false,
          message: `Data akun dengan id ${id} tidak tersedia!`,
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Berhasil menampilkan semua data akun",
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },

  // 'improvisasi' menampilkan detail informasi akun dengan tampilan detail usernya!
  index2: async (req, res, next) => {
    try {
      let usersAccount = await prisma.bankAccounts.findMany({
        include: {
          user: true,
        },
      });

      if (!usersAccount) {
        return res.status(404).json({
          status: false,
          message: `Data akun dengan id ${id} tidak tersedia!`,
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Berhasil menampilkan semua data akun!",
        data: usersAccount,
      });
    } catch (error) {
      next(error);
    }
  },

  // menampilkan detail akun!
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let accounts = await prisma.bankAccounts.findUnique({
        where: { id },
      });

      if (!accounts) {
        return res.status(400).json({
          status: false,
          message: `Tidak dapat menemukan akun dengan id ${id}!`,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: `Berhasil menampilkan data akun dengan id ${id}!`,
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
};
