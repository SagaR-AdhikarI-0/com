
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDTrF1BRaULIoQ5NYSaeb65Svc7w3IwT-Q",
  authDomain: "sunday1-53c00.firebaseapp.com",
  projectId: "sunday1-53c00",
  storageBucket: "sunday1-53c00.appspot.com",
  messagingSenderId: "734821522729",
  appId: "1:734821522729:web:df23a58f599f88a157ab38"
};
const app = initializeApp(firebaseConfig);
const fireDb=getFirestore(app);
const imageDb=getStorage(app);
export {app,fireDb,imageDb}; 