import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import createHttpError from "http-errors";
import globalErrorHandler from "./utils/global_error_handler";
import { catchAsyncError } from "./utils/helpers";




const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
  

app.use(
    catchAsyncError(async (req: ExpressRequest) => {
      throw createHttpError.NotFound(`${req.path} resource doesn't exists`);
    }),
  );
  
app.use(globalErrorHandler);
  

export default app;


