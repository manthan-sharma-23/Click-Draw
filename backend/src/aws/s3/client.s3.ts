import { S3Client } from "@aws-sdk/client-s3";
import { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../../utils/env";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  region: "ap-south-1",
});
