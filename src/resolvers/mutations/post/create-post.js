import { v4 as uuidv4 } from "uuid";

export const createPost = async (parent, args, ctx, info) => {
  const { title, body, published, userId } = args.data;
  const { prisma, pubsub } = ctx;

  const foundAuthor = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!foundAuthor)
    throw new Error("The author isn't registered on the website.");

  const id = uuidv4();

  try {
    const createdPost = await prisma.post.create({
      data: {
        id,
        title,
        body,
        published,
        userId,
      },
    });
    if (createdPost.published)
      pubsub.publish("post", {
        post: {
          mutation: "CREATE",
          data: createdPost,
        },
      });
    return createdPost;
  } catch (error) {
    console.error("Couldn't create post", error);
    return {
      error,
    };
  }
};
