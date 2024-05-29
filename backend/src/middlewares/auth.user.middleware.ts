import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let authHeader = req.header("Authorization");

    if (!authHeader) {
      throw new Error("Invalid Auth Header");
    }

    if (authHeader.startsWith("Bearer ")) {
      authHeader = authHeader.split(" ")[1];
    }

    const object = jwt.verify(authHeader, SECRET_KEY);

    // @ts-ignore
    req.user = object;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
