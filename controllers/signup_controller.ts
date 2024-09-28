import { Request, Response, NextFunction } from "express";
const { db } = require("../db/query");

function createUser() {
  db.createUser("Sye, asdq23,asdas@gmail.com");
}
export interface User {
  id: String;
  email: String;
  nickname: String;
  password: String;
  role?: String;
  comments: (string | number)[];
  articles: (string | number)[];
}
