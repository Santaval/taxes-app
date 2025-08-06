    import ReportsController from "../../controller/users/reports.controller";
import { isAuth } from "../../middlewares/auth.middleware";
import { Router } from "express";
        
    const reportsRouter = Router();

    // Get the current user's tax profile
    reportsRouter.get("/iva", isAuth, ReportsController.iva);
    // Get income and expenses report from specific month
    reportsRouter.get("/income-and-expenses", isAuth, ReportsController.incomeAndExpenses);

    export default reportsRouter;
