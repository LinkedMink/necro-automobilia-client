const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

let jwtPublicKey = process.env.JWT_PUBLIC_KEY;
if (!jwtPublicKey) {
  const jwtPublicKeyFile = process.env.JWT_PUBLIC_KEY_FILE 
    ? process.env.JWT_PUBLIC_KEY_FILE 
    : 'jwtRS256.key.pub';

  if (fs.existsSync(jwtPublicKeyFile)) {
    jwtPublicKey = btoa(fs.readFileSync(jwtPublicKeyFile, 'utf8'));
  }
}

const logLevelConsole = process.env.LOG_LEVEL_CONSOLE 
  ? process.env.LOG_LEVEL_CONSOLE.toUpperCase() 
  : 'NONE'

const logLevelPersist = process.env.LOG_LEVEL_CONSOLE 
  ? process.env.LOG_LEVEL_PERSIST.toUpperCase() 
  : 'WARN'

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config', function (req, res) {
  res.send({
    urls: {
      user: process.env.USER_SERVICE_URL,
      necroAutomobilia: process.env.NECRO_AUTOMOBILIA_URL,
    },
    jwtPublicKey: jwtPublicKey,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    logLevelConsole,
    logLevelPersist
  });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(80);
