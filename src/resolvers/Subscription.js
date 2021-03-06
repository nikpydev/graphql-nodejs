export const Subscription = {
  count: {
    subscribe: (parent, args, ctx, info) => {
      const { pubsub } = ctx;
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator("count");
    },
  },

  user: {
    subscribe: async (parent, args, ctx, info) => {
      const { prisma, pubsub } = ctx;
      const { userId } = args;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) throw new Error(`User with ID: [${userId}] doesn't exist`);
      return pubsub.asyncIterator("user");
    },
  },

  post: {
    subscribe: (parent, args, ctx, info) => {
      const { pubsub } = ctx;
      return pubsub.asyncIterator("post");
    },
  },

  comment: {
    subscribe: async (parent, args, ctx, info) => {
      const { prisma, pubsub } = ctx;
      const { postId } = args;
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post)
        throw new Error(
          `The post ${postId} does not exist or isn't published yet`
        );

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
};
