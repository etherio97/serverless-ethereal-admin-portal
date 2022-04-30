const {
  JWT_ALGORITHM,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PUBLIC_KEY,
} = require('../config');

const { createSign, createVerify } = require('crypto');

const verify = (token) => {
  let signer = createSign(JWT_ALGORITHM);
  let verifier = createVerify(JWT_ALGORITHM);
  signer.update(token);
  verifier.update(token);
  return verifier.verify(
    FIREBASE_PUBLIC_KEY,
    signer.sign(FIREBASE_PRIVATE_KEY, 'hex'),
    'hex'
  );
};

const decode = (token) => {
  try {
    let [, body] = token.split('.');
    let buff = new Buffer(body, 'base64');
    return JSON.parse(buff.toString('ascii'));
  } catch (e) {
    throw new Error('Invalid ID Token');
  }
};

module.exports = {
  verify,
  decode,
};
