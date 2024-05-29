import { Request, Response } from "express";
import database from "../../db";
import { SECRET_KEY_WORKER } from "../../utils/env";
import jwt from "jsonwebtoken";

export const user_signin_controller = async (_req: Request, res: Response) => {
  try {
    const hardCoded_wallet_address: string =
      "EdVZAVvhhEhjj5jKPNxeZi3pWfb5CeZ2dZyVNUi5fJWc";

    const exisitingUser = await database.user.upsert({
      where: {
        address: hardCoded_wallet_address,
      },
      update: {
        address: hardCoded_wallet_address,
      },
      create: {
        address: hardCoded_wallet_address,
      },
    });

    const token = jwt.sign({ userId: exisitingUser.id }, SECRET_KEY_WORKER);

    return res.json({ token });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
