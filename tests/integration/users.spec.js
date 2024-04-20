const app = require("../../app");
const request = require("supertest");

describe("test POST /api/v1/users endpoint ", () => {
  let name = "Gis Faldi";
  let email = "gisfaldi@gmail.com";
  let password = "gisfaldi";
  let identityType = "KTP";
  let identityNumber = "182935321";
  let address = "Jl. Mekarwangi no.107, Bandung";

  test("test email belum terdaftar -> sukses", async () => {
    try {
      let { statusCode, body } = await request(app).post("/api/v1/users").send({
        name,
        email,
        password,
        identityType,
        identityNumber,
        address,
      });

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("name", name);
      expect(body.data).toHaveProperty("email", email);
      expect(body.data).toHaveProperty("password", password);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test email sudah terdaftar -> error", async () => {
    try {
      let { statusCode, body } = await request(app).post("/api/v1/users").send({
        name,
        email,
        password,
        identityType,
        identityNumber,
        address,
      });
      expect(statusCode).toBe(400);
      expect(body).not.toHaveProperty("error");
    } catch (err) {
      expect(err).toBe("email sudah dipakai");
    }
  });
});

// describe("test getUserById(:id)", () => {
//   test(" test cari user dengan id yang sudah terdaftar -> sukses", async () => {
//     try {
//       let result = await getUserById(user.id);

//       expect(result).toHaveProperty("id");
//       expect(result).toHaveProperty("name", user.name);
//       expect(result).toHaveProperty("email", user.email);
//       expect(result).toHaveProperty("password", user.password);
//     } catch (err) {
//       expect(err).toBe("error");
//     }
//   });

//   test("test cari user dengan invalid id -> error", async () => {
//     try {
//       await getUserById(user.id * -1);
//     } catch (err) {
//       expect(err).toBe("id tidak terdaftar");
//     }
//   });
// });
