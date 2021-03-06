export const deletePost = async (parent, args, ctx, info) => {
  const { id } = args;
  const { prisma, pubsub } = ctx;

  try {
    await prisma.comment.deleteMany({
      where: {
        postId: id,
      },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });

    if (!deletedPost) throw new Error(`The post with ID: ${id} doesn't exist`);

    pubsub.publish("post", {
      post: {
        mutation: "DELETE",
        data: deletedPost,
      },
    });
    return deletedPost;
  } catch (error) {
    console.error("Couldn't delete post: ", error);
    return {
      error,
    };
  }
};
