import { config } from "dotenv";

config();

export const PORT = Number(process.env.PORT);

export const SECRET_KEY: string = process.env.SECRET_KEY || "";

export const S3_ACCESS_KEY: string = process.env.S3_IAM_ACCESS_KEY!;
export const S3_SECRET_ACCESS_KEY: string =
  process.env.S3_IAM_SECRET_ACCESS_KEY!;

export const BUCKET_NAME_S3 = "my-bucket-1m1";
