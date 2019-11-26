const fs = require("fs");
const jwt = require("jsonwebtoken");

// Create a Cloud IoT Core JWT for the given project id, signed with the given
// private key.
module.exports.createJwt = (projectId, privateKeyFile, algorithm) => {
  const token = {
    iat: parseInt(Date.now() / 1000),
    exp: parseInt(Date.now() / 1000) + 60 * 60, // 60 minutes
    aud: projectId
  };
  const privateKey = fs.readFileSync(privateKeyFile);
  return jwt.sign(token, privateKey, { algorithm: algorithm });
};

module.exports.publishAsync = (deviceId, mqttTopic, client, numMessages) => {
  // Publish and schedule the next publish.
  const publishDelayMs = 1000;
  let timesToRunLeft = numMessages;

  const intervalID = setInterval(() => {
    if (timesToRunLeft-- <= 0) {
      clearInterval(intervalID);
      client.end();
    }

    const message = JSON.stringify({
      name: deviceId,
      value: Math.floor(Math.random() * 1000),
      date: new Date(),
      coordinates: "22.1122, 78.4214"
    });

    // qos=1 means at least once delivery.
    client.publish(mqttTopic, message, { qos: 1 }, err => {
      if (!err) {
        console.log(`SENDING MESSAGE: ${deviceId}:`, message);
      }
    });
  }, publishDelayMs);
};
