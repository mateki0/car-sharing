const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const cars = require("./cars");
const user = require("./user");
const { verify } = require("jsonwebtoken");
const {
  isAuthenticatedDirective,
} = require("./user/directives/is-authenticated");
const config = require("./config");
const cookieParser = require("cookie-parser");

const typeDef = gql`
  type Query
  type Mutation
  directive @isAuthenticated on FIELD_DEFINITION
`;

const server = new ApolloServer({
  upload:false,
  typeDefs: [typeDef, cars.typeDef, user.typeDef],
  resolvers: [cars.resolvers, user.resolvers],
  context: ({ req, res }) => ({ req, res }),
});

const app = express();

app.use(cookieParser());

app.use('/graphql', graphqlUploadExpress({maxFileSize: 1000000000, maxFiles: 5}));

app.use((req, _, next) => {
  const accessToken = req.cookies["access-token"];

  try {
    const data = verify(accessToken, config.ACCESS_TOKEN_SECRET);
    req.userId = data.userId;
  } catch {}
  next();
});

server.applyMiddleware({
  path: "/",
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:5000",
  },
});

module.exports = app;
