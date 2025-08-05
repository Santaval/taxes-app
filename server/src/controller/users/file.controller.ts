import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { MinioService } from '../../services/minio.service';

export class FileController {
  static async uploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      // folder where the file will be stored
      const { directory } = req.query;
      const folder = directory ? `${directory}/` : '';

      const file = req.file;

      // Generate a unique file name
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `${folder}${fileName}`;

      // Upload to MinIO
      await MinioService.uploadFile(file, filePath);

      // Generate file URL
      const fileUrl = await MinioService.getFileUrl(filePath);

    
      res.json({
        file: {
          url: fileUrl.split('?')[0],
        },
      });
    } catch (error) {
      console.error('File upload error:', error);      
      // Send more specific error messages based on the error type
      if (typeof error === 'object' && error !== null && 'code' in error) {
        if ((error as any).code === 'ECONNREFUSED') {
          res.status(503).json({ error: 'Storage service is unavailable' });
          return;
        }
        if ((error as any).code === 'AccessDenied') {
          res.status(403).json({ error: 'Access denied to storage service' });
          return;
        }
      }
      
      res.status(500).json({ 
        error: 'Error uploading file',
        details: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error)
      });
    }
  }
} 