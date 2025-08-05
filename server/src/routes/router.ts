import { Router } from "express";
import authRouter from "./auth/auth.routes";
import profileRouter from "./users/profile.routes";
import { isAuth } from "../middlewares/auth.middleware";
import adminUsersRouter from "./admin/users.routes";
import companiesRouter from "./users/companies.routes";
import filesRouter from "./users/file.routes";
import taxProfileRouter from "./users/taxProfile.routes";
const router = Router();

router.use("/auth", authRouter);
router.use("/profile", isAuth, profileRouter);
router.use("/companies", isAuth, companiesRouter);
router.use("/tax-profile", isAuth, taxProfileRouter);
router.use("/files", isAuth, filesRouter);


// admin routes
router.use("/admin/users", isAuth, adminUsersRouter);

export default router;