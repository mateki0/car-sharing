const {
  gql,
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class isAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const context = args[2];

      if (!context || !context.user) {
        throw new AuthenticationError("Brak dostępu");
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = {
  isAuthenticatedDirective,
};
