export const updateComment = async (parent, args, ctx, info) => {
  let { id, data } = args;
  const { prisma, pubsub } = ctx;

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id,
      },
      data,
    });

    if (!updatedComment) throw new Error("The comment doesn't exist");

    pubsub.publish(`comment ${comments[commentIdx].post}`, {
      comment: {
        mutation: "UPDATE",
        data: updatedComment,
      },
    });
    return updatedComment;
  } catch (error) {
    console.error("Couldn't update comment: ", error);
  }
};
