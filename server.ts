import express from "express";
import jsonBodyParser from "./middleware/jsonBodyParser";
import errorMiddleware from "./middleware/error";
import apiRouter from "./api/router";
import cors from "cors";
import { requestLogger } from "./middleware/loggers";
// const Backend = require('i18next-fs-backend')
// const i18next = require('i18next')
// const HttpBackend = require('i18next-http-backend')
import HttpBackend from "i18next-http-backend";

import i18next from "i18next";
// import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";

i18next
  .use(HttpBackend)
  // .use(languageDetector)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    ns: ["general", "fruits"],
    // debug: true,
    // detection: {
    //   order: ['customDetector']
    // },
    backend: {
      // eslint-disable-next-line no-path-concat
      // loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
      loadPath: "http://localhost:4000" + "/locales/{{lng}}/{{ns}}.json",
      // eslint-disable-next-line no-path-concat
      // addPath: __dirname + "/locales/{{lng}}/{{ns}}.missing.json",
    },
    fallbackLng: "en",
    // nonExplicitSupportedLngs: true,
    supportedLngs: ["en", "es", "de"],
    // load: "languageOnly",
  });

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(requestLogger);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/locales", express.static("locales"));
app.use(i18nextMiddleware.handle(i18next));
app.use(jsonBodyParser);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  console.log("req.i18n.language", req.i18n.language);
  console.log("req.i18n.languages", req.i18n.languages);

  res.render("index");
});

app.use(errorMiddleware);

export default app;
