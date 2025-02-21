import { kafka } from "../connection/connect_to_kafka";
export async function createProducer() {
    try {
        // Create a producer
        const producer = kafka.producer();

        // Connect to the broker
        await producer.connect();

        // Publish a message to the topic
        const publishResponse = await producer.send({
            topic: "test-topic",
            messages: [{ value: "Hello" }],
        });

        kafka.logger().debug(`Published message: ${JSON.stringify(publishResponse)}`);

        // Disconnect the producer
        //await producer.disconnect();

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