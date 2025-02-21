import express from "express";
import router from "./router/routes";

const app = express();

app.get("/publish", router);
app.get("/consume", router);

export default app;