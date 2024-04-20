const app = require("../../app");
const request = require("supertest");

describe("test POST /api/v1/users endpoint ", () => {
  let name = "regis2";
  let email = "regis2@gmail.com";
  let password = "regis2";
  let identityType = "regis2";
  let identityNumber = "regis2";
  let address = "regis2";

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
