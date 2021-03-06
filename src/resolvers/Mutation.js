import { createUser } from "./mutations/user/create-user.js";
import { deleteUser } from "./mutations/user/delete-user.js";
import { updateUser } from "./mutations/user/update-user.js";

import { createPost } from "./mutations/post/create-post.js";
import { deletePost } from "./mutations/post/delete-post.js";
import { updatePost } from "./mutations/post/update-post.js";

import { createComment } from "./mutations/comment/create-comment.js";
import { deleteComment } from "./mutations/comment/delete-comment.js";
import { updateComment } from "./mutations/comment/update-comment.js";

export const Mutation = {
  // User Mutations
  createUser,
  deleteUser,
  updateUser,

  // Post Mutations
  createPost,
  deletePost,
  updatePost,

  // CommentMutations
  createComment,
  deleteComment,
  updateComment,
};
