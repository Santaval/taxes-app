import { Router } from "express";
import TransactionController from "../../controller/users/transaction.controller";
import schemaValidator from "../../middlewares/schemaValidator";
import { NewTransactionSchema, UpdateTransactionSchema } from "../../schemas/transaction.schema";

const transactionsRouter = Router();

// Get all transactions with optional filters
transactionsRouter.get("/", TransactionController.allByUser);

// Get a specific transaction
transactionsRouter.get("/:id", TransactionController.find);

// Create a new transaction
transactionsRouter.post(
  "/",
  schemaValidator(NewTransactionSchema),
  TransactionController.create
);

// Update a transaction
transactionsRouter.put(
  "/:id",
  schemaValidator(UpdateTransactionSchema),
  TransactionController.update
);

// Delete a transaction
transactionsRouter.delete("/:id", TransactionController.delete);

export default transactionsRouter;
