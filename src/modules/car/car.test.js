const expect = require("expect");
const { request } = require("../../utils/test");

const testCar = {
  brand: "ford",
  model: "focus",
  productionYear: "2010",
  engineCapacity: "2.0",
  enginePower: "155km",
  id: "xyz",
};
const addCar = (
  { brand, model, productionYear, engineCapacity, enginePower },
  returnValues = `{brand,model,productionYear,engineCapacity,enginePower}`
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
  // describe("deleteCar", () => {
  //   describe("delete car", () => {
  //     it("should delete car", () => {
  //       return request({
  //         query: `
  //         mutation {
  //           deleteCar(carId:"${testCar.id}"){
  //             car {
  //               id
  //             }
  //           }
  //         }
  //       `,
  //       })
  //         .expect((res) => {
  //           expect(res.body).toHaveProperty("data.deleteCar.id");
  //         })
  //         .expect(200);
  //     });
  //   });
  // });
});
