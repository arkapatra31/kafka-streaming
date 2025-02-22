import { Partitioners } from "kafkajs";
import { kafka } from "../connection/connect_to_kafka";

export async function createProducer(topic: string, message: any) {
    try {
        // Create a producer
        const producer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner,
        });

        // Connect to the broker
        await producer.connect();

        // Publish a message to the topic
        const publishResponse = await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        kafka.logger().debug(`Published message: ${JSON.stringify(publishResponse)}`);

        // Disconnect the producer
        await producer.disconnect();

        return {
            response: publishResponse,
            status: 200
        };
    } catch (e: any) {
        console.error(e);
        return {
            response: e,
            status: 500
        };
    }
}