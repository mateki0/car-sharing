const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cars = require("./cars");
const user = require("./user");
const { verify } = require("jsonwebtoken");
const {
  isAuthenticatedDirective,
} = require("./user/directives/is-authenticated");
const config = require("./config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const typeDef = gql`
  type Query
  type Mutation
  directive @isAuthenticated on FIELD_DEFINITION
`;
const server = new ApolloServer({
  typeDefs: [typeDef, cars.typeDef, user.typeDef],
  resolvers: [cars.resolvers, user.resolvers],
  context: ({ req, res }) => ({ req, res }),
});

const app = express();

app.use(cookieParser());

app.use((req, _, next) => {
  const accessToken = req.cookies["access-token"];

  try {
    const data = verify(accessToken, config.ACCESS_TOKEN_SECRET);
    req.userId = data.userId;
  } catch {}
  next();
});
// app.use(
//   session({
//     secret: "asd",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
server.applyMiddleware({
  path: "/",
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:5000",
  },
});

module.exports = app;
