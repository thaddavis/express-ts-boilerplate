import express from "express";

import helloWorld from "./helloWorld";

const router = express.Router();

router.use(helloWorld);

export default router;
