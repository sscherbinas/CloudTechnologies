const mqtt = require("mqtt");

const { createJwt, publishAsync } = require("./helpers");

module.exports.mqttDeviceDemo = (
  deviceIds,
  registryId,
  projectId,
  region,
  algorithm,
  privateKeyFile,
  mqttBridgeHostname,
  mqttBridgePort,
  messageType,
  numMessages
) => {
  deviceIds.forEach(deviceId => {
    // The "mqtts" protocol causes the library to connect using SSL, which
    // is required for Cloud IoT Core.
    const connectionArgs = {
      host: mqttBridgeHostname,
      port: mqttBridgePort,
      clientId: `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`,
      username: "unused",
      password: createJwt(projectId, privateKeyFile, algorithm),
      protocol: "mqtts",
      secureProtocol: "TLSv1_2_method"
    };
    const mqttTopic = `/devices/${deviceId}/${messageType}`;

    const client = mqtt.connect(connectionArgs);

    // Subscribe to the topic to receive config updates
    client.subscribe(`/devices/${deviceId}/config`, { qos: 1 });
    // Subscribe to the /devices/{device-id}/commands/# topic to receive all messages
    client.subscribe(`/devices/${deviceId}/commands/#`, { qos: 0 });

    client.on("connect", success => {
      console.log("Client connected");

      if (success) {
        publishAsync(deviceId, mqttTopic, client, numMessages);
      }
    });

    client.on("close", () => {
      console.log(`Connection to device(${deviceId}) client finished`);
    });

    client.on("error", err => {
      console.log(`Error in device(${deviceId}) client`, err);
    });

    client.on("message", (topic, message) => {
      let messageStr = "Message received: ";
      if (topic === `/devices/${deviceId}/config`) {
        messageStr = "Config message received: ";
      } else if (topic.startsWith(`/devices/${deviceId}/commands`)) {
        messageStr = "Command message received: ";
      }

      messageStr += Buffer.from(message, "base64").toString();
      console.log(messageStr);
    });
  });
};
