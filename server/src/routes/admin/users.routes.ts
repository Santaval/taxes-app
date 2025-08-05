import AdminUsersController from '../../controller/users/users.admin.controller';
import express from 'express';

const adminUsersRouter = express.Router();

adminUsersRouter.get('/', AdminUsersController.all);
adminUsersRouter.get('/:id', AdminUsersController.getById);

export default adminUsersRouter;