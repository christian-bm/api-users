import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
import { appRoutes } from "./routers";

const app = express();

app.use(express.json());

appRoutes(app);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT || 3000);
