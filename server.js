const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/config', function (req, res) {
  res.send({
    userServiceUrl: process.env.USER_SERVICE_URL,
    perferenceServiceUrl: process.env.PREFERENCE_SERVICE_URL,
    necroAutomobiliaUrl: process.env.NECRO_AUTOMOBILIA_URL,
  });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(80);