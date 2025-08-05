import express from "express";
import validateSchema from "../../middlewares/schemaValidator";
import { NewUserSchema, SignUpSchema } from "../../schemas/user.schema";
import AuthController from "../../controller/auth/auth.controller";
import { LoginRequestSchema } from "../../schemas/auth.schema";
import { isAuth } from "../../middlewares/auth.middleware";


const authRouter = express.Router();

authRouter.post("/signup", validateSchema(SignUpSchema), AuthController.signup);
authRouter.post("/login", validateSchema(LoginRequestSchema), AuthController.login);
authRouter.post("/login/admin", AuthController.loginAdmin);
authRouter.post("/complete", isAuth, validateSchema(NewUserSchema), AuthController.complete);
authRouter.post("/google", AuthController.google);
authRouter.post("/facebook", AuthController.facebook);
authRouter.post("/apple", AuthController.apple);

authRouter.get("/user", isAuth, AuthController.getUser);

export default authRouter;
