const { PrismaClient } = require("@prisma/client");
const { uuid } = require('uuidv4');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs")
function getArticles  (){
  return prisma.article.findMany({})
}
function getArticle  (id){
  return prisma.user.findUnique({where:id})

}
function getComments  (){
  return prisma.comment.findMany({})

}
function getComment  (id){
  return prisma.comment.findUnique({where:id})

}
function getUser  (id){
  return prisma.user.findUnique({where:id})

}
function createArticle  (){
  return prisma.article.create({data:{
    email,nickname
  }})

}
function createComment  (id){
  return prisma.comment.create({data:{
    email,nickname
  }})
}
function createUser  (id){
  return prisma.user.create({data:{
    email,nickname
  }})
}
function editArticle  (id){
  return prisma.article.edit()

}
function editComment  (id){
  return prisma.comment.edit()

}
function deleteArticle  (id){
  return prisma.article.edit()

}
function deleteComment  (id){
  return prisma.comment.delete()
}
function deleteUser  (id){
  return prisma.user.delete({where:id})
}
module.exports = {
  getArticles,
  getArticle,
  getComments,
  getComment,
  getUser,
  createArticle,
  createComment,
  createUser,
  editArticle,
  editComment,
  deleteArticle,
  deleteComment,
  deleteUser}