import express from "express";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "./routes/users.js";
import { initDb } from "./lib/db.js";
import { leadsRouter } from "./routes/leads.js";

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

await initDb();

app.get("/", (_req, res) => {
  res.send({
    status: "Ok",
    message: "Server is running",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/leads", leadsRouter);

export default app;
