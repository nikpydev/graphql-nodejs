export const Post = {
  author: async (parent, args, ctx, info) => {
    const { userId } = parent;
    const { prisma } = ctx;
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },

  comments: async (parent, args, ctx, info) => {
    const { id } = parent;
    const { prisma } = ctx;
    return await prisma.comment.findMany({
      where: {
        postId: id,
      },
    });
  },
};
