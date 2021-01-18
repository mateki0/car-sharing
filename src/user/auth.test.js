const expect = require("expect");
const { set } = require("../app");
const { request } = require("../utils/test");

const testUser = {
  email: "test-user@gmail.com",
  password: "test1234",
};
const signup = ({ email, password }, returnValues = `{id email}`) => {
  return request({
    query: `
      mutation{
        signup(
          email: "${email}",
          password: "${password}",
        ) ${returnValues}
      }
    `,
  });
};

describe("auth", () => {
  describe("sign up", () => {
    it("should create a new user", () => {
      return signup(testUser)
        .expect((res) => {
          expect(res.body).toHaveProperty("data.signup.id");
          expect(res.body).toHaveProperty("data.signup.email", testUser.email);
        })
        .expect(200);
    });

    it("should not create a new user when a password is missing", () => {
      return signup({
        ...testUser,
        password: null,
      }).expect((res) => {
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toBe(true);
      });
    });

    it("should not create a new user with the same email", () => {
      return signup(testUser).expect((res) => {
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toBe(true);
      });
    });
  });

  describe("login", () => {
    it("should successfully login and return id and email", () => {
      return request({
        query: `
        mutation {
          login(email:"${testUser.email}", password:"${testUser.password}"){
              id
              email
          }
        }
        `,
      })
        .expect((res) => {
          expect(res.body).toHaveProperty("data.login.id");
          expect(res.body).toHaveProperty("data.login.email");
        })
        .expect(200);
    });
  });

  describe("me", () => {
    let loginResponse = null;
    before(async () => {
      await request({
        query: `
        mutation {
          login(email:"${testUser.email}", password:"${testUser.password}") {
              id
              email
          }
        }
        `,
      })
        .expect((res) => {
          expect(res.body).toHaveProperty("data.login.id");
          expect(res.body).toHaveProperty("data.login.email");

          loginResponse = res.header["set-cookie"][1];
        })
        .expect(200);
    });
    it("should not return a profile when not logged in", () => {
      return request({
        query: `
        query me{
          me{
            id
            email
          }
        }
        `,
      }).expect((res) => {
        expect(res.body.data.me).toEqual(null);
      });
    });
    // it("should successfully return the profile from me", () => {
    //   const token = loginResponse.slice(
    //     loginResponse.indexOf("="),
    //     loginResponse.indexOf(";")
    //   );

    //   return request({
    //     query: `
    //     query me {
    //       me {
    //         id
    //         email
    //       }
    //     }`,
    //   })
    //     .set("set-cookie", token)
    //     .expect((res) => {

    //       console.log("token", token);
    //       console.log("me res", res.header);
    //       expect(res.body).toHaveProperty("data.me.id");
    //       expect(res.body).toHaveProperty("data.me.email", testUser.email);
    //     })
    //     .expect(200);
    // });
  });
});
