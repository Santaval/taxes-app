    import { Router } from "express";
    import TaxProfileController from "../../controller/users/taxProfile.controller";
    import schemaValidator from "../../middlewares/schemaValidator";
    import { NewTaxProfileSchema, UpdateTaxProfileSchema } from "../../schemas/taxProfile.schema";
        
    const taxProfileRouter = Router();

    // Get the current user's tax profile
    taxProfileRouter.get("/", TaxProfileController.my);

    // Create a new tax profile
    taxProfileRouter.post(
    "/",
    schemaValidator(NewTaxProfileSchema),
    TaxProfileController.create
    );

    // Update a tax profile
    taxProfileRouter.put(
    "/",
    schemaValidator(UpdateTaxProfileSchema),
    TaxProfileController.update
    );

    // Delete a tax profile
    taxProfileRouter.delete("/", TaxProfileController.delete);

    export default taxProfileRouter;
