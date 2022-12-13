
import dotenv from "dotenv"
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import  path  from "path";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(morgan("dev")); // logs all the incoming req information
// app.use(helmet()) // setting default security headers to protect some attacks
app.use(cors()) // allow cross origin resources
app.use(express.json()); // convert income data in the req.body


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")))

// MongoDB connect
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

// routers
import userRouter from "./src/routers/userRotuer.js";
import transactionRouter from "./src/routers/TransactionRouter.js"
import { isAuth } from "./src/middleware/AuthMiddleware.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", isAuth, transactionRouter)

app.get("/dashboard", (req, res) => {
  res.redirect("/")
})

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.js"))
})


app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found",
    code:200,
  }
  next(error)

});

// global error handler
app.use((error, req, res, next) => {
  // const code = error.code || 500;
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
 
  error
    ? console.log(error)
    : console.log(`you server is ready at http://localhost:${PORT}`);
});

