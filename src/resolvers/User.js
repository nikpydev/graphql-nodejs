export const User = {
  posts: async (parent, args, ctx, info) => {
    const { prisma } = ctx;
    const { id } = parent;
    try {
      return await prisma.post.findMany({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      console.error("Couldn't fetch posts for this user: ", error);
    }
  },

  comments: async (parent, args, ctx, info) => {
    const { prisma } = ctx;
    const { id } = parent;
    try {
      return await prisma.comment.findMany({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      console.error("Couldn't fetch comments for this user: ", error);
    }
  },
};
