import CompaniesController from "../../controller/companies/companies.controller";
import express from "express";

const companiesRouter = express.Router();

companiesRouter.get("/", CompaniesController.all);

export default companiesRouter;
