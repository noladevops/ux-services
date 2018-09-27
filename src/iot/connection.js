const fs = require ('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');


const mqttTopic =  `/devices/nolab-display/events`;
const configTopic = `/devices/nolab-display/config`;
const mqttClientId = `projects/nolab-io/locations/us-central1/registries/nolab-io/devices/nolab-display`;
const payload = `nolab-io/cloud-display-payload-text`;


var connectionArgs = {
  host: 'mqtt.googleapis.com',
  port: '8883',
  clientId: 'projects/nolab-io/locations/us-central1/registries/nolab-io/devices/nolab-display',
  username: 'unused',
  password: createJwt('nolab-io', './.keys/nolab-display_private.pem', 'RS256'),
  protocol: 'mqtts',
  secureProtocol: 'TLSv1_2_method'
};

var client = {}


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

  function initializeClient() {

    // Create a client, and connect to the Google MQTT bridge.
    let iatTime = parseInt(Date.now() / 1000);
    let client = mqtt.connect(connectionArgs);


    // Subscribe to the /devices/{device-id}/config topic to receive config updates.
    client.subscribe(configTopic, {qos: 0});

    client.on('connect', (success) => {
      console.log('connect');
      if (!success) {
        console.log('Client not connected...');
      }

    });

    client.on('close', () => {
      console.log('close');
      //shouldBackoff = true;
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

  }

  function publishMessage(message) {
    // Publish "payload" to the MQTT topic. qos=1 means at least once delivery.
   // Cloud IoT Core also supports qos=0 for at most once delivery.
    console.log('Publishing message:', payload);
    client.publish(mqttTopic, payload, { qos: 1 }, function (err) {
      if (!err) {
        console.log(err);
        return err;
      }
    });
  }


  function createSubscription(topic,checkFrequency,checkComplete,checkErr){

  }

  function MQTTConnection()  {}

  MQTTConnection.createSubscription = createSubscription;
  MQTTConnection.publishMessage = publishMessage;
  MQTTConnection.initializeClient = initializeClient;
  MQTTConnection.createJwt = createJwt;


module.exports = MQTTConnection;
