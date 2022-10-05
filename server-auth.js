import express from "express";
import { router as authenticationRoutes } from "./routes/authentication.route.js";

const app = express();
app.use(express.json());

app.use("/auth", authenticationRoutes);

app.listen(3001);
