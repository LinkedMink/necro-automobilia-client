const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

let jwtPublicKey = process.env.JWT_PUBLIC_KEY;
if (!jwtPublicKey) {
  const jwtPublicKeyFile = process.env.JWT_PUBLIC_KEY_FILE 
    ? process.env.JWT_PUBLIC_KEY_FILE 
    : 'jwtRS256.key.pub';

  jwtPublicKey = btoa(fs.readFileSync(jwtPublicKeyFile, 'utf8'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config', function (req, res) {
  res.send({
    userServiceUrl: process.env.USER_SERVICE_URL,
    perferenceServiceUrl: process.env.PREFERENCE_SERVICE_URL,
    necroAutomobiliaUrl: process.env.NECRO_AUTOMOBILIA_URL,
    jwtPublicKey: jwtPublicKey,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(80);
