const { PrismaClient } = require("@prisma/client");
const { uuid } = require("uuidv4");
const prisma = new PrismaClient();
import { User } from "../controllers/signup_controller";
const bcrypt = require("bcrypt");
// Posts CRUD
function getPosts() {
  return prisma.Post.findMany({});
}
function getPost(id: String) {
  return prisma.user.findUnique({ where: id });
}
function createPost(
  title: String,
  content: String,
  isPublished: boolean,
  userId: String
) {
  return prisma.Post.create({
    data: {
      title,
      content,
      isPublished,
      userId,
    },
  });
}
function editPost(
  id: String,
  title: String,
  content: String,
  isPublished: boolean
) {
  return prisma.Post.update({
    where: { id },
    data: { title, content, isPublished },
  });
}
function deletePost(id: String) {
  return prisma.Post.delete({
    where: {
      id,
    },
  });
}

// COMMENTS CRUD
function getCommentsByPostId(id: String) {
  return prisma.comment.findUnique({ where: id });
}

function getUserComments(userId: String) {
  // const authorId = "";
  return prisma.comment.findMany({ where: { userId } });
}
function createComment(postId: String, email: String, nickname: String) {
  return prisma.comment.create({
    data: {
      email,
      nickname,
    },
    where: {},
  });
}
function editComment(id: String, message: String) {
  return prisma.comment.edit({ where: { id }, data: { message } });
}
function deleteComment(id: String) {
  return prisma.comment.delete({ where: { id } });
}

function createUser({
  nickname,
  password,
  email,
  role = "User",
}: Omit<User, "id">): Promise<User> {
  return prisma.user.create({
    data: {
      email,
      nickname,
      password,
      role,
    },
  });
}

function deleteUser(id: String) {
  return prisma.user.delete({ where: id });
}
async function getUser(nickname: String, password: String) {
  const user = prisma.user.findUnique({ where: nickname });
  if (!user) {
    return null;
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return user;
  } else {
    return null;
  }
}
module.exports = {
  getPosts,
  getPost,
  getCommentsByPostId,
  getUserComments,
  getUser,
  createPost,
  createComment,
  createUser,
  editPost,
  editComment,
  deletePost,
  deleteComment,
  deleteUser,
};
