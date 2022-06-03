import express from "express";
import healthCheck from "./healthCheck";
import messages from "./messages";

const router = express.Router();

router.use(healthCheck);
router.use(messages);

export default router;
