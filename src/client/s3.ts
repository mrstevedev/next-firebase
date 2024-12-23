import { S3Client } from "@aws-sdk/client-s3";

export const s3: S3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY as string
    }
});
