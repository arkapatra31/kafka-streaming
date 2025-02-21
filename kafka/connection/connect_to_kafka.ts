import { Kafka } from "kafkajs";

// Create a new Kafka instance with the brokers
export const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

kafka.logger().info("Kafka client created");