import { createProducer, createTopics, run_consumer } from "@kafka-streaming/kafka";
import express, { json, Request, Response } from "express";

const router = express.Router();

router.use("/createTopic", async (req: Request, res: Response) => {
    const payload = req.body;
    const topics: string[] = payload.topics.split(",");
    const { response, status } = await createTopics(topics);
    res.send(response).status(status);
});

router.use("/publish", async (req: Request, res: Response) => {
    const { message, topic } = req.body;
    const { response, status } = await createProducer(topic, message);
    res.send(response).status(status);
});

router.use("/consume", async (req: Request, res: Response) => {
    const topic: string = req.body.topic;
    const { response, status } = await run_consumer(topic);
    res.send(response).status(status);
});

export default router;
