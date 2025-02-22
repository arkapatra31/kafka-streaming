import { KafkaMessage } from "kafkajs";
import { kafka } from "../connection/connect_to_kafka";

export async function run_consumer(topic: string) {
    try {
        // Create a consumer
        const consumer = kafka.consumer({ groupId: 'test-group', retry: { retries: 10 } });

        // Connect Consumer to the broker
        await consumer.connect();

        // Subscribe to the topic
        await consumer.subscribe({ topic, fromBeginning: true });

        // Run the consumer and fetch the topic messages and return the response
        const messages: any[] = [];
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const parsedMessage = JSON.parse(message?.value?.toString() || "{}");
                messages.push({
                    topic: topic,
                    partition: partition,
                    message: parsedMessage
                });
                console.log(`Received message: ${JSON.stringify(parsedMessage)}`);
            },
        });

        // Wait for a few seconds to ensure messages are consumed
        await new Promise(resolve => setTimeout(resolve, 10000));

        return {
            response: messages,
            status: 200
        };

    } catch (e: any) {
        if (e.type === 'REBALANCE_IN_PROGRESS') {
            console.warn('Rebalancing in progress, retrying...');
            return run_consumer(topic); // Retry the consumer
        } else {
            console.error(e);
            return {
                response: e,
                status: 500
            };
        }
    }
}