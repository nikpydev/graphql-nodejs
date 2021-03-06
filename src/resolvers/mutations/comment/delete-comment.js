export const deleteComment = async (parent, args, ctx, info) => {
  const { id } = args;
  const { prisma, pubsub } = ctx;

  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETE",
        data: deletedComment,
      },
    });
    return deletedComment;
  } catch (error) {
    console.error("Couldn't delete comment: ", error);
    return {
      error,
    };
  }
};
