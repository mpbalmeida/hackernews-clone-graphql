const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
require('dotenv').config();
console.log(process.env.PRISMA_ENDPOINT)

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
    drafts(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: false } }, info)
    },
    post(parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id } }, info)
    },
    linksFeed: (parent, args, ctx, info) => {
      return ctx.db.query.links(info);
    },
    singleLink: (parent, { id }, ctx, info) => {
      return ctx.db.query.link({where: {id}}, info);
    }

  },
  Mutation: {
    createDraft(parent, { title, text }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            text,
          },
        },
        info,
      )
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({ where: { id } }, info)
    },
    publish(parent, { id }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      );
    },
    createLink: (parent, {url, description}, ctx, info) => {
      return ctx.db.mutation.createLink(
        {
          data: {
            url,
            description
          }
        },
        info
      );
    },
    updateLink: (parent, {id, url, description}, ctx, info) => {
      return ctx.db.mutation.updateLink(
        {
          where: { id },
          data: { 
            url,
            description
          }
        },
        info
      );
    },
    deleteLink: (parent, {id}, ctx, info) => {
      return ctx.db.mutation.deleteLink({where: {id}}, info);
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
