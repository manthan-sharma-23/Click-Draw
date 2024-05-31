import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  BUCKET_NAME,
  S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY,
} from 'src/engine/utils/config/env.config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private _s3_client: S3Client;
  constructor() {
    this._s3_client = new S3Client({
      credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
      region: 'ap-south-1',
    });
  }

  private image_key_generator({ userId }: { userId: number }) {
    return `click-draw/${userId}/${Math.random() * 100000}/image.jpg`;
  }

  async generate_presigned_url({ userId }: { userId: number }) {
    const key = this.image_key_generator({ userId });
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: 'img/jpg',
    });

    const url = await getSignedUrl(this._s3_client, command, {
      expiresIn: 1800,
    });

    return { key, url };
  }
}
