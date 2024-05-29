import e from "express";
import UserRouter from "./routes/user.route";
import WorkerRouter from "./routes/worker.routes";
import { config } from "dotenv";

config();
const app = e();

const PORT = process.env.PORT || 3022;

app.use("/v1/user", UserRouter);
app.use("/v1/worker", WorkerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
