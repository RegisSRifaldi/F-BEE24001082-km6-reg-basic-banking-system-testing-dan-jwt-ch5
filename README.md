# DOCS API, TESTING, and AUTHENTICATION

Project ini untuk memenuhi Challenge Chapter 5

Project ini memakai beberapa tools

- Bahasa pemograman JavaScript
- Database Postgres
- ORM Prisma
- Testing with Jest dan Supertest
- JWT

# Login, Register, Authenticate, and Dokumentasi API

- Login :
  POST http://localhost:3000/api/v1/auth/register

- Register :
  POST http://localhost:3000/api/v1/auth/login

- Authenticate :
  GET http://localhost:3000/api/v1/auth/authenticate

- Dokumentasi API :
  GET http://localhost:3000/api/v1/api-docs

# Users

- Menambahkan data user baru beserta dengan profilnya! :
  POST http://localhost:3000/api/v1/users

- menampilkan daftar users! :
  GET http://localhost:3000/api/v1/users

- 'improvisasi' menampilkan detail informasi user dengan tampilan detail profilnya! :
  GET http://localhost:3000/api/v1/users-profile

- menampilkan detail informasi user dengan menampilkan juga profilnya! :
  GET http://localhost:3000/api/v1/users/1

# Account

- menambahkan akun baru ke user yang sudah didaftarkan! :
  POST http://localhost:3000/api/v1/account

- menampilkan daftar akun! :
  GET http://localhost:3000/api/v1/account

- 'improvisasi' menampilkan detail informasi akun dengan tampilan detail usernya! :
  GET http://localhost:3000/api/v1/account-profile

- menampilkan detail akun! :
  GET http://localhost:3000/api/v1/account/1

# Transaction

- mengirimkan uang dari 1 akun ke akun lain!
  POST http://localhost:3000/api/v1/transaction

- menampilkan daftar transaksi!
  GET http://localhost:3000/api/v1/transaction

- 'improvisasi' menampilkan daftar transasksi dengan tampilan akun dan usernya!
  GET http://localhost:3000/api/v1/transaction-profile

- menampilkan detail transaksi dengan menampilkan pengirim dan penerimanya!
  GET http://localhost:3000/api/v1/transaction/1

# Views belum benar ketika login masuk ke authenticate

- Web Login
  http://localhost:3000/login

- Web Register
  http://localhost:3000/register

- Web Authenticate
  http://localhost:3000/authenticate
