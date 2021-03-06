import { v4 as uuidv4 } from "uuid";

export const createComment = async (parent, args, ctx, info) => {
  const { text, postId, userId } = args.data;
  const { prisma, pubsub } = ctx;

  const id = uuidv4();

  try {
    const createdComment = await prisma.comment.create({
      data: {
        id,
        text,
        postId,
        userId,
      },
    });

    pubsub.publish(`comment ${postId}`, {
      comment: {
        mutation: "CREATE",
        data: createdComment,
      },
    });

    return createdComment;
  } catch (error) {
    console.error("Couldn't post comment");
    return {
      error,
    };
  }
};
