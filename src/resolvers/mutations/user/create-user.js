import { v4 as uuidv4 } from "uuid";

export const createUser = async (parent, args, ctx, info) => {
  const { name, email, age } = args.data;
  const { pubsub, prisma } = ctx;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) throw new Error("The provided email ID already exists");

  const id = uuidv4();

  const newUser = {
    id,
    name,
    email,
    age,
  };
  try {
    const createdUser = await prisma.user.create({
      data: newUser,
    });
    pubsub.publish("user", {
      user: {
        mutation: "CREATE",
        data: newUser,
      },
    });
    return createdUser;
  } catch (error) {
    console.error("Couldn't save the user to DB: ", error);
    return {
      error,
    };
  }
};
