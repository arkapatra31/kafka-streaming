import { createProducer, run_consumer } from "@kafka-streaming/kafka";
import express, { Request, Response } from "express";

const router = express.Router();

router.use("/publish", async (req: Request, res: Response) => {
    const response = await createProducer();
    res.send(response);
});

router.use("/consume", async (req: Request, res: Response) => {
    const response = await run_consumer();
    res.send(response);
});

export default router;
