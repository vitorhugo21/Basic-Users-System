const crypto = require('crypto');
const fs = require('fs');

function generateDotEnv() {
  crypto.randomBytes(48, (err, buffer) => {
    if (err) {
      throw err;
    }

    const token = buffer.toString('hex');
    const dotEnvContent = `SECRET_KEY=${token}\r\nDB_STRING=`;

    fs.writeFileSync(`${__dirname}/.env`, dotEnvContent);
  });
}

generateDotEnv();
