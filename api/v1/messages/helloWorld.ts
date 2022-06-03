import { NextFunction } from "connect";
import express, { Request, Response } from "express";

export interface ResponseBodyDto {
  message: any;
}

const router = express.Router();

router.get(
  "/helloWorld",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const responseBody: ResponseBodyDto = {
        message: "Hello World",
      };

      res.status(200).json(responseBody);
    } catch (e) {
      throw e;
    }
  }
);

export default router;
