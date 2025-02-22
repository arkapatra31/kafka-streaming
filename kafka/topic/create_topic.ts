import { ITopicConfig } from "kafkajs";
import { kafka } from "../connection/connect_to_kafka";

// Create a new topic
export async function createTopics(topicList: string[]) {
    try {
        // Create a new topic
        const admin = kafka.admin();
        await admin.connect();

        // Create the topics
        const topics: ITopicConfig[] = topicList.map((topic) => {
            return {
                topic: topic,
                numPartitions: 100,
            };
        });

        const response = await admin.createTopics({
            topics,
        });

        await admin.disconnect();

        return {
            response: response === true ? `Topics created successfully ✅✅✅ \n ${topicList}` : `Failed to create topics ❌❌❌`,
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