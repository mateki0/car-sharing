const expect = require("expect");
const { request } = require("../utils/test");
const borrowCar = require("./resolvers/borrowCar");

const testCar = {
  brand: "ford",
  model: "focus",
  productionYear: "2010",
  engineCapacity: "2.0",
  enginePower: "155km",
  available: true,
  owner: "user123",
  imagePublicId: "1231231",
  id: "5fffebd52484bb1e06bd1d5d",
  borrowedBy: "asdxyz",
  borrowedFrom: "1234123654",
  borrowedTo: "123412365412",
};
const addCar = (
  {
    brand,
    model,
    productionYear,
    engineCapacity,
    enginePower,
    available,
    owner,
    imagePublicId,
  },
  returnValues = `{brand,model,productionYear,engineCapacity,enginePower,available,owner,imagePublicId}`
) => {
  return request({
    query: `
      mutation{
        addCar(
          brand: "${brand}",
          model: "${model}",
          productionYear: "${productionYear}",
          engineCapacity: "${engineCapacity}",
          enginePower: "${enginePower}",
          available: ${available},
          owner: "${owner}",
          imagePublicId:"${imagePublicId}",
        ) ${returnValues}
      }
    `,
  });
};

describe("addCar", () => {
  describe("add car", () => {
    it("should add new car", () => {
      return addCar(testCar)
        .expect((res) => {
          expect(res.body).toHaveProperty("data.addCar");
        })
        .expect(200);
    });
    it("should not add car without a brand", () => {
      return addCar({
        ...testCar,
        brand: null,
      }).expect((res) => {
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toBe(true);
      });
    });
  });

  describe("delete car", () => {
    it("should delete car", () => {
      return request({
        query: `
          mutation {
            deleteCar(carId:"${testCar.id}", imagePublicId:"${testCar.imagePublicId}"){
             brand
            }
          }
        `,
      })
        .expect((res) => {
          expect(res.body).toHaveProperty("data.deleteCar.brand");
        })
        .expect(200);
    });
  });

  describe("borrow car", () => {
    it("should borrow Car", () => {
      return request({
        query: `
          mutation {
            borrowCar(
              id:"${testCar.id}", 
              borrowedBy:"${testCar.borrowedBy}", 
              borrowedFrom:"${testCar.borrowedFrom}", 
              borrowedTo:"${testCar.borrowedTo}"){
                id
            }
          }
        `,
      }).expect(200);
    });
  });

  describe("check if borrow date is over", () => {
    it("should handle availability", () => {
      return request({
        query: `
        mutation{
          checkBorrowDate{
            brand
          }
        }`,
      })
        .expect((res) => {
          expect(res.body).toHaveProperty("data.checkBorrowDate.brand");
        })
        .expect(200);
    });
  });

  describe("should return all cars", () => {
    it("return all cars", () => {
      return request({
        query: `
        query cars{
          cars{
            brand
          }
        }`,
      })
        .expect((res) => {
          expect(res.body).toHaveProperty("data.cars");
        })
        .expect(200);
    });
  });
});
