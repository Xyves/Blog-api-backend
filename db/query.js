const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Posts CRUD
function getDbPosts() {
  return prisma.post.findMany({
    orderBy: {
      created: "desc",
    },
    take: 7,
  });
}
function getDbPost(id) {
  return prisma.post.findUnique({ where: { id } });
}
function getCategories(postId) {
  return prisma.post.findMany({
    where: { id: postId },
    select: { categories: true },
  });
}
function getCommentsCount(postId) {
  const comments = prisma.comment.findMany({ where: { postId: postId } });
  return comments.length;
}
function createPost(title, content, isPublished, userId, categories) {
  return prisma.post.create({
    data: {
      title,
      content,
      isPublished,
      userId,
      categories,
    },
  });
}
function updatePost(id, title, content, isPublished, userId) {
  return prisma.post.update({
    where: { id },
    data: { title, content, isPublished },
  });
}
function deletePost(id) {
  return prisma.post.delete({
    where: {
      id,
    },
  });
}

// COMMENTS CRUD
function getAllCommentsByPostId(postId) {
  return prisma.comment.findMany({ where: { postId } });
}

function getUserComments(userId) {
  // const authorId = "";
  return prisma.comment.findMany({ where: { userId } });
}
function createComment(postId, message, userId) {
  return prisma.comment.create({
    data: {
      postId: postId,
      message: message,
      userId: userId,
    },
  });
}
function editComment(id, message) {
  return prisma.comment.edit({ where: { id }, data: { message } });
}
function deleteComment(id) {
  return prisma.comment.delete({ where: { id } });
}
async function createUser(nickname, password, email, role = "USER") {
  return prisma.user.create({
    data: {
      nickname,
      password,
      email,
      role,
    },
  });
}

function deleteUser(id) {
  return prisma.user.delete({ where: id });
}
async function getUserByName(nickname) {
  return await prisma.user.findUnique({ where: { nickname } });
}
async function getUserById(userId) {
  if (!userId) {
    throw new Error("userId is undefined");
  }
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}
module.exports = {
  getDbPosts,
  getDbPost,
  getAllCommentsByPostId,
  getUserById,
  getUserComments,
  getUserByName,
  createPost,
  createComment,
  updatePost,
  editComment,
  createUser,
  deletePost,
  deleteComment,
  deleteUser,
  getCategories,
  getCommentsCount,
};
