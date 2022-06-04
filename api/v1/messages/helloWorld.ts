import { NextFunction } from "connect";
import express, { Request, Response } from "express";

export interface ResponseBodyDto {
  message: any;
  language: string;
  languages: readonly string[];
}

const router = express.Router();

router.get(
  "/helloWorld",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const responseBody: ResponseBodyDto = {
        message: req.t("general:hello_world"),
        language: req.i18n.language,
        languages: req.i18n.languages,
      };

      res.status(200).json(responseBody);
    } catch (e) {
      throw e;
    }
  }
);

export default router;
