import express from "express";
<<<<<<< HEAD
import { getRelationships, addRelationship, deleteRelationship } from "../controllers/relationships.js";
=======
import { getRelationships, addRelationship, deleteRelationship } from "../controllers/relationship.js";
>>>>>>> 2bee9c484676cc5176bfe10195212fc3b8ed3615

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 2bee9c484676cc5176bfe10195212fc3b8ed3615
