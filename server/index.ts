import express from "express";
import router from "./router/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/createTopic", router);
app.post("/publish", router);
app.post("/consume", router);

export default app;