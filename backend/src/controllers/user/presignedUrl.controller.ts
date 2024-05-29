import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { BUCKET_NAME_S3 } from "../../utils/env";
import { ImageKeyGenerator } from "../../utils/generator-functions/image-key.generator";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../aws/s3/client.s3";

export const pre_signed_url_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) throw new Error("UnAuthorised");

    console.log(userId);
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME_S3,
      Key: ImageKeyGenerator({ userId }),
      ContentType: "img/jpg",
    });

    const preSignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return res.json({ preSignedUrl });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
