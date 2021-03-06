export const users = async (parent, args, ctx, info) => {
  const { query } = args;
  const { prisma } = ctx;

  try {
    return query
      ? await prisma.user.findMany({
          where: {
            name: {
              contains: query,
            },
          },
        })
      : await prisma.user.findMany();
  } catch (error) {
    console.error("Couldn't fetch users: ", error);
    return {
      error,
    };
  }
};
