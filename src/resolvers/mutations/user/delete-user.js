export const deleteUser = async (parent, args, ctx, info) => {
  const { id } = args;
  const { pubsub, prisma } = ctx;

  const userToBeDeleted = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!userToBeDeleted) throw new Error("The user doesn't exist!");

  try {
    const deletedPosts = await prisma.post.deleteMany({
      where: {
        userId: id,
      },
    });
    const deletedComments = await prisma.comment.deleteMany({
      where: {
        userId: id,
      },
    });
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    pubsub.publish("user", {
      user: {
        mutation: "DELETE",
        data: deletedUser,
      },
    });
    return deletedUser;
  } catch (error) {
    console.error("Couldn't delete user: ", error);
  }
}