export const updateUser = async (parent, args, ctx, info) => {
  let { id, data } = args;
  const { prisma, pubsub } = ctx;

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  pubsub.publish("user", {
    user: {
      mutation: "UPDATE",
      data: users[userIdx],
    },
  });
  return updatedUser;
};
