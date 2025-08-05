import * as Minio from 'minio'
import dotenv from 'dotenv'

dotenv.config()

// Instantiate the MinIO client with the object store service
// endpoint and an authorized user's credentials
// play.min.io is the MinIO public test cluster
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
})

type File_t = {
  size: number;
  mimetype: string;
  buffer: Buffer;
};

export class MinioService {
  static async uploadFile(file: File_t, filePath: string) {
    try {
      await minioClient.putObject(
        process.env.MINIO_BUCKET_NAME as string,
        filePath,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        }
      );

      return filePath;
    } catch (error) {

      throw error;
    }
  }

  static async getFileUrl(filePath: string) {
    try {
      return await minioClient.presignedGetObject(
        process.env.MINIO_BUCKET_NAME as string,
        filePath,
        24 * 60 * 60 // 24 hours in seconds
      );
    } catch (error) {
      console.error('MinIO Get URL Error:', error);
      throw error;
    }
  }

  static async deleteFile(filePath: string) {
    try {
      await minioClient.removeObject(process.env.MINIO_BUCKET_NAME as string, filePath);
    } catch (error) {
      console.error('MinIO Delete Error:', error);
      throw error;
    }
  }
}
