import { NextFunction } from "connect";
import express, { Request, Response } from "express";

export interface ErrorResponseBodyDto {
  message: string;
}

export interface ResponseBodyDto {
  message: any;
}

const router = express.Router();

router.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const responseBody: ResponseBodyDto = {
        message: "OK",
      };

      throw new Error("Yay!");

      res.status(200).json(responseBody);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
