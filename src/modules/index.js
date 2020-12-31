const { makeExecutableSchemaFromModules } = require("../utils/modules");

const auth = require("./auth");
const car = require("./car");

module.exports = makeExecutableSchemaFromModules({
  modules: [auth, car],
});
