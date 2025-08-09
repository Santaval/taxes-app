import { Router } from "express";
import ClientController from "../../controller/users/client.controller";
import schemaValidator from "../../middlewares/schemaValidator";
import { NewClientSchema, UpdateClientSchema } from "../../schemas/client.schema";

const clientsRouter = Router();

// Get all clients for the current user
clientsRouter.get("/", ClientController.all);

// Get a specific client
clientsRouter.get("/:id", ClientController.find);

// Create a new client
clientsRouter.post(
  "/",
  schemaValidator(NewClientSchema),
  ClientController.create
);

// Update a client
clientsRouter.put(
  "/:id",
  schemaValidator(UpdateClientSchema),
  ClientController.update
);

// Delete a client
clientsRouter.delete("/:id", ClientController.delete);

export default clientsRouter;
