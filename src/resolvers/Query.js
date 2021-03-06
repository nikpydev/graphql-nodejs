import { users } from "./queries/get-users.js";
import { posts } from "./queries/get-posts.js";
import { comments } from "./queries/get-comments.js";
import { post } from "./queries/get-post.js";

export const Query = {
  users,
  posts,
  post,
  comments,
};
