import { descryptedText, encryptedText } from "../CryptoJs/CryptoJs";

const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify({ ...value }));
};
const saveLocalStorageEncrypted = (key, value) => {
  localStorage.setItem(key, encryptedText(JSON.stringify({ ...value })));
};

const getObjectLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const getObjectLocalStorageDescrypted = (key) => {
  return JSON.parse(descryptedText(localStorage.getItem(key)));
};

const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export {
  saveLocalStorage,
  saveLocalStorageEncrypted,
  getObjectLocalStorage,
  getObjectLocalStorageDescrypted,
  clearLocalStorage,
};
