import { kafka } from "../connection/connect_to_kafka";

export async function run_consumer() {
    try {
        // Create a consumer
        const consumer = kafka.consumer({ groupId: 'test-group' });

        // Connect Consumer to the broker
        await consumer.connect();

        // Subscribe to the topic
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

        // Run the consumer
        // const consumerResponse = await consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //         console.log({
        //             value: message?.value?.toString(),
        //         });

        //         kafka.logger().info('Message processed', {
        //             topic,
        //             partition,
        //             offset: message.offset,
        //             value: message.value?.toString(),
        //         });
        //     },
        // });

        //Run the consumer and fetch the topic messages and return the response
        const consumerResponse = await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message?.value?.toString(),
                });

                kafka.logger().info('Message processed', {
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value?.toString(),
                });
            },
        });

        // Disconnect the consumer
        //await consumer.disconnect();

        return {
            response: consumerResponse,
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