import express from "express";
import jsonBodyParser from "./middleware/jsonBodyParser";
import errorMiddleware from "./middleware/error";
import apiRouter from "./api/router";

import cors from "cors";
import { requestLogger } from "./middleware/loggers";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(requestLogger);
app.use(jsonBodyParser);
app.use("/api", apiRouter);
app.use(errorMiddleware)

export default app;
