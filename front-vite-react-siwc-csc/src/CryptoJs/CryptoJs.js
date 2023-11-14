import CryptoJS from 'crypto-js';

const KEY = "twNQB[=r5,eI$$3/Kq?(Tq]NWm+1V|#s";

const encryptedText = (planeText) =>
  CryptoJS.AES.encrypt(planeText, KEY).toString();

const descryptedText = (encryptedText) =>
  CryptoJS.AES.decrypt(encryptedText, KEY).toString(CryptoJS.enc.Utf8);

export { encryptedText, descryptedText };
