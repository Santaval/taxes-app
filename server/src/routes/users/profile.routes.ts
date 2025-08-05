import express from "express";
import validateSchema from "../../middlewares/schemaValidator";
import { NewUserSchema } from "../../schemas/user.schema";
import ProfileController from "../../controller/users/profile.controller";

const profileRouter = express.Router();

profileRouter.put("/", validateSchema(NewUserSchema), ProfileController.update);

export default profileRouter;
