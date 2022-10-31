import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";

export const uploadFile = async (
  file: Express.Multer.File,
  key: string
): Promise<string> => {
  const network = process.env.NETWORK!;
  const bucketName = process.env.S3_BUCKET_NAME!.replace("{network}", network);

  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: fromEnv(),
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
      })
    );

    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log("File url", fileUrl);

    return fileUrl;
  } catch (err: any) {
    throw new ErrorException(ErrorCode.S3UploadError, err);
  }
};
