import PC from "@prisma/client";
const { PrismaClient } = PC;
import { GraphQLServer, PubSub } from "graphql-yoga";
import { Query } from "./resolvers/Query.js";
import { Mutation } from "./resolvers/Mutation.js";
import { Subscription } from "./resolvers/Subscription.js";
import { User } from "./resolvers/User.js";
import { Post } from "./resolvers/Post.js";
import { Comment } from "./resolvers/Comment.js";

const pubsub = new PubSub();
const prisma = new PrismaClient();

// Resolvers
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
    pubsub,
  },
});

server.start(() => {
  console.log(`The server is up!`);
});
