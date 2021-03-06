export const comments = async (parent, args, ctx, info) => {
  const { query } = args;
  const { prisma } = ctx;
  try {
    return query
      ? await prisma.comment.findMany({
          where: {
            text: {
              includes: query.toLowerCase(),
            },
          },
        })
      : await prisma.comment.findMany();
  } catch (error) {
    console.error("Couldn't fetch comments: ", error);
  }
};
