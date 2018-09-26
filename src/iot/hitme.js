

/**
 * Copyright 2018, nolab.io
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const fs = require ('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

console.log("Hey there");

// Create a Cloud IoT Core JWT for the given project id, signed with the given
// private key.
// [START iot_mqtt_jwt]
function createJwt (projectId, privateKeyFile, algorithm) {
  // Create a JWT to authenticate this device. The device will be disconnected
  // after the token expires, and will have to reconnect with a new token. The
  // audience field should always be set to the GCP project id.
  const token = {
    'iat': parseInt(Date.now() / 1000),
    'exp': parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
    'aud': projectId
  };
  const privateKey = fs.readFileSync(privateKeyFile);
  return jwt.sign(token, privateKey, { algorithm: algorithm });
}
// [END iot_mqtt_jwt]
// [START iot_mqtt_run]

// With Google Cloud IoT Core, the username field is ignored, however it must be
// non-empty. The password field is used to transmit a JWT to authorize the
// device. The "mqtts" protocol causes the library to connect using SSL, which
// is required for Cloud IoT Core.
let connectionArgs = {
  host: 'mqtt.googleapis.com',
  port: '8883',
  clientId: 'projects/nolab-io/locations/us-central1/registries/nolab-io/devices/nolab-display',
  username: 'unused',
  password: createJwt('nolab-io', './.keys/nolab-display_private.pem', 'RS256'),
  protocol: 'mqtts',
  secureProtocol: 'TLSv1_2_method'
};

// Create a client, and connect to the Google MQTT bridge.
let iatTime = parseInt(Date.now() / 1000);
let client = mqtt.connect(connectionArgs);

// Subscribe to the /devices/{device-id}/config topic to receive config updates.
client.subscribe(`/devices/nolab-display/config`, {qos: 1});

// The MQTT topic that this device will publish data to. The MQTT
// topic name is required to be in the format below. The topic name must end in
// 'state' to publish state and 'events' to publish telemetry. Note that this is
// not the same as the device registry's Cloud Pub/Sub topic.
const mqttTopic = `/devices/nolab-display/info-stream`;

client.on('connect', (success) => {
  console.log('connect');
  if (!success) {
    console.log('Client not connected...');
  } else if (!publishChainInProgress) {
    publishAsync(1, argv.numMessages);
  }
});

client.on('close', () => {
  console.log('close');
  shouldBackoff = true;
});

client.on('error', (err) => {
  console.log('error', err);
});

client.on('message', (topic, message, packet) => {
  console.log('message received: ', Buffer.from(message, 'base64').toString('ascii'));
});

client.on('packetsend', () => {
  // Note: logging packet send is very verbose
});

// Once all of the messages have been published, the connection to Google Cloud
// IoT will be closed and the process will exit. See the publishAsync method.
// [END iot_mqtt_run]
// The mqttClientId is a unique string that identifies this device. For Google
// Cloud IoT Core, it must be in the format below.
const mqttClientId = `projects/nolab-io/locations/us-central1/registries/nolab-io/devices/nolab-display`;


