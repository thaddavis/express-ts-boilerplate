import express from "express";
import healthCheck from "./healthCheck";
import messages from "./messages";
import i18n from "./i18n";

const router = express.Router();

router.use(healthCheck);
router.use(messages);
router.use(i18n);

export default router;
