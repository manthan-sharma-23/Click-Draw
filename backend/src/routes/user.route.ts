import { Router } from "express";
import jwt from "jsonwebtoken";
import database from "../db";
import { SECRET_KEY } from "../utils/env";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authMiddleware } from "../middlewares/auth.user.middleware";
import { PreSignedUrl_Controller } from "../controllers/presignedUrl.controller";

const router = Router();

const s3Client = new S3Client();
const command = new PutObjectCommand({
  Bucket: "my-bucket-1m1",
  Key: "/click-draw",
});

// wallet
router.post("/signin", async (_, res) => {
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

  const token = jwt.sign({ userId: exisitingUser.id }, SECRET_KEY);

  return res.json({ token });
});

router.post("/presignedUrl", authMiddleware, PreSignedUrl_Controller);

export default router;
