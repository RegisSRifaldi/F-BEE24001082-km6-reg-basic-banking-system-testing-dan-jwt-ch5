const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // mengirimkan uang dari 1 akun ke akun lain!
  store: async (req, res, next) => {
    try {
      let { source_account_id, destination_account_id, amount } = req.body;

      if (!source_account_id || !destination_account_id || !amount) {
        return res.status(400).json({
          status: false,
          message: "Data transaksi harus di isi terlebih dahulu!",
          data: null,
        });
      } else {
        if (source_account_id == destination_account_id) {
          res.status(400).json({
            status: false,
            message: "Tidak diizinkan untuk transfer ke akun tujuan yang sama!",
            data: null,
          });
        }
      }

      let senderAccount = await prisma.bankAccounts.findUnique({
        where: {
          id: source_account_id,
        },
      });

      if (!senderAccount) {
        res.status(404).json({
          status: false,
          message: `Tidak ditemukan akun dengan id ${id}, masukan akun pengirim yang benar!`,
          data: null,
        });
      }
      let receiverId = await prisma.bankAccounts.findUnique({
        where: {
          id: destination_account_id,
        },
      });

      if (!receiverId) {
        res.status(404).json({
          status: false,
          message: `Tidak ditemukan akun tujuan dengan id ${id}, masukan tujuan id akun yang benar!`,
          data: null,
        });
      }

      await prisma.$transaction([
        prisma.bankAccounts.update({
          where: {
            id: source_account_id,
          },
          data: {
            balance: {
              decrement: amount,
            },
          },
        }),
        prisma.bankAccounts.update({
          where: {
            id: destination_account_id,
          },
          data: {
            balance: {
              increment: amount,
            },
          },
        }),
      ]);

      let transaction = await prisma.transaction.create({
        data: {
          source_account_id,
          destination_account_id,
          amount,
        },
      });

      res.status(201).json({
        status: true,
        message: "Berhasil melakukan transasksi!",
        data: transaction,
      });
    } catch (err) {
      next(err);
    }
  },

  // menampilkan daftar transaksi!
  index: async (req, res, next) => {
    try {
      transactions = await prisma.transaction.findMany();

      if (!transactions) {
        return res.status(404).json({
          status: false,
          message: `Daftar transaksi dengan id ${id} tidak tersedia!`,
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Berhasil menampilkan semua data transaksi",
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  },

  // 'improvisasi' menampilkan daftar transasksi dengan tampilan akun dan usernya!
  index2: async (req, res, next) => {
    try {
      let transactionAccount = await prisma.transaction.findMany({
        include: {
          profile: true,
        },
        include: {
          sourceAccount: {
            include: {
              user: true,
            },
          },
          destinationAccount: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!transactionAccount) {
        return res.status(404).json({
          status: false,
          message: `Daftar transaksi dengan id ${id} tidak tersedia!`,
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Berhasil menampilkan semua daftar transaksi",
        data: transactionAccount,
      });
    } catch (error) {
      next(error);
    }
  },

  // menampilkan detail transaksi dengan menampilkan pengirim dan penerimanya!
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let transactions = await prisma.transaction.findUnique({
        where: { id },
        include: {
          sourceAccount: {
            include: {
              user: true,
            },
          },
          destinationAccount: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!transactions) {
        return res.status(400).json({
          status: false,
          message: `Tidak dapat menemukan transaksi dengan id ${id}`,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: `Berhasil menampilkan data transaksi dengan id ${id}`,
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  },
};
