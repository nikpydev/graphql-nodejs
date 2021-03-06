export const updatePost = async (parent, args, ctx, info) => {
  let { id, data } = args;
  const { prisma, pubsub } = ctx;

  const oldPost = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  const oldPublishedVal = oldPost.published;

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data,
    });

    if (!updatedPost) throw new Error("The post doesn't exist");

    if (!oldPublishedVal && data.published)
      pubsub.publish("post", {
        post: {
          mutation: "CREATE",
          data: updatedPost,
        },
      });
    else if (oldPublishedVal && data.published)
      pubsub.publish("post", {
        post: {
          mutation: "UPDATE",
          data: updatedPost,
        },
      });
    else if (oldPublishedVal && !data.published)
      pubsub.publish("post", {
        post: {
          mutation: "DELETE",
          data: oldPost,
        },
      });
    return updatedPost;
  } catch (error) {
    console.error("Couldn't update post: ", updatedPost);
  }
};
