export const post = async (parent, args, ctx, info) => {
  const { id } = args;
  const { prisma } = ctx;
  try {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Could't fetch post: ", error);
  }
};
