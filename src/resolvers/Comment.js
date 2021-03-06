export const Comment = {
  post: async (parent, args, ctx, info) => {
    const { prisma } = ctx;
    const { postId } = parent;
    return await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  },

  author: async (parent, args, ctx, info) => {
    const { prisma } = ctx;
    const { userId } = parent;
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};
