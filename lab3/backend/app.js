"use strict";
const { mqttDeviceDemo } = require("./commands");

const { argv } = require(`yargs`)
  .options({
    projectId: {
      default: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
      description:
        "The Project ID to use. Defaults to the value of the GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variables.",
      requiresArg: true,
      type: "string"
    },
    cloudRegion: {
      default: "us-central1",
      description: "GCP cloud region.",
      requiresArg: true,
      type: "string"
    },
    registryId: {
      description: "Cloud IoT registry ID.",
      requiresArg: true,
      demandOption: true,
      type: "string"
    },
    deviceId: {
      description: "Cloud IoT device ID.",
      requiresArg: false,
      demandOption: false,
      type: "string"
    },
    deviceIds: {
      description: "Array of cloud IoT devices.",
      requiresArg: false,
      demandOption: false,
      type: "array"
    },
    privateKeyFile: {
      description: "Path to private key file.",
      requiresArg: true,
      demandOption: true,
      type: "string"
    },
    algorithm: {
      description: "Encryption algorithm to generate the JWT.",
      requiresArg: true,
      demandOption: true,
      choices: ["RS256", "ES256"],
      type: "string"
    },
    tokenExpMins: {
      default: 20,
      description: "Minutes to JWT token expiration.",
      requiresArg: true,
      type: "number"
    },
    mqttBridgeHostname: {
      default: "mqtt.googleapis.com",
      description: "MQTT bridge hostname.",
      requiresArg: true,
      type: "string"
    },
    mqttBridgePort: {
      default: 8883,
      description: "MQTT bridge port.",
      requiresArg: true,
      type: "number"
    }
  })
  .command(
    `mqttDeviceDemo`,
    `Connects a device, sends data, and receives data`,
    {
      messageType: {
        default: "events",
        description: "Message type to publish.",
        requiresArg: true,
        choices: ["events", "state"],
        type: "string"
      },
      numMessages: {
        default: 10,
        description: "Number of messages to publish.",
        demandOption: true,
        type: "number"
      }
    },
    opts => {
      mqttDeviceDemo(
        opts.deviceIds,
        opts.registryId,
        opts.projectId,
        opts.cloudRegion,
        opts.algorithm,
        opts.privateKeyFile,
        opts.mqttBridgeHostname,
        opts.mqttBridgePort,
        opts.messageType,
        opts.numMessages
      );
    }
  )
  .example(
    `node $0 mqttDeviceDemo --projectId=blue-jet-123 \\\n\t--registryId=my-registry --deviceId=my-node-device \\\n\t--privateKeyFile=../rsa_private.pem --algorithm=RS256 \\\n\t--cloudRegion=us-central1 --numMessages=10 \\\n`
  )
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/iot-core/docs`)
  .help()
  .strict();
