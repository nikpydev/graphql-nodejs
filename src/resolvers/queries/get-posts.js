export const posts = async (parent, args, ctx, info) => {
  const { query } = args;
  const { prisma } = ctx;

  try {
    return query
      ? await prisma.post.findMany({
          where: {
            title: {
              contains: query,
            },
            body: {
              contains: query,
            },
          },
        })
      : await prisma.post.findMany();
  } catch (error) {
    console.error("Couldn't fetch posts: ", error);
    return {
      error,
    };
  }
};
