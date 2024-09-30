import { Request, Response, NextFunction } from "express";
const { db } = require("../db/query");

export interface User {
  id: String;
  email: String;
  nickname: String;
  password: String;
  role?: String;
  comments: (string | number)[];
  articles: (string | number)[];
}
