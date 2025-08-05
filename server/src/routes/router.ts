import { Router } from "express";
import authRouter from "./auth/auth.routes";
import profileRouter from "./users/profile.routes";
import { isAuth } from "../middlewares/auth.middleware";
import adminUsersRouter from "./admin/users.routes";
import filesRouter from "./users/file.routes";
import taxProfileRouter from "./users/taxProfile.routes";
import transactionsRouter from "./users/transaction.routes";
import reportsRouter from "./users/reports.routes";
const router = Router();

router.use("/auth", authRouter);
router.use("/profile", isAuth, profileRouter);
router.use("/tax-profile", isAuth, taxProfileRouter);
router.use("/transactions", isAuth, transactionsRouter);

router.use("/files", isAuth, filesRouter);

router.use("/reports", isAuth, reportsRouter);

// admin routes
router.use("/admin/users", isAuth, adminUsersRouter);

export default router;