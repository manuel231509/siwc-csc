import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkvgau_zHh6iyR4a-2oDqHz--Uf0wr8j8",
  authDomain: "siwc-csc.firebaseapp.com",
  projectId: "siwc-csc",
  storageBucket: "siwc-csc.appspot.com",
  messagingSenderId: "1077585184007",
  appId: "1:1077585184007:web:a7dec0262b414cb7a671a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadFile = async (element, url, handleChangeLoading, nameField) => {
  const storageRef = ref(storage, `${url}/${element.id}_${element.file.name}`);
  const metadata = {
    contentType: element.file.type,
  };

  try {
    handleChangeLoading(nameField, true);
    await uploadBytes(storageRef, element.file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return {
      id: element.id,
      name: element.file.name,
      url: downloadURL,
      type: element.file.type,
      lastModified: element.file.lastModified,
      size: element.file.size,
    };
  } catch (error) {
    handleChangeLoading(nameField, false);
  }
};

const deleteFile = async (element, url) => {
  const desertRef = ref(storage,`${url}/${element.id}_${element.file.name}`);
  return await deleteObject(desertRef);
};

export { storage, uploadFile, deleteFile };
