import { FileController } from '../../controller/users/file.controller';
import express from 'express';
import multer from 'multer';

const filesRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

  // Upload file
  filesRouter.post('/', upload.single('file'), FileController.uploadFile);

  // Get file by ID
 // filesRouter.get('/:id', FileController.getFile);

// Delete file
 //filesRouter.delete('/:id', FileController.deleteFile);

export default filesRouter;