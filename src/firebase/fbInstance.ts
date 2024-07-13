import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWVAGvWTD9Mc-jPCSaSHmP22UFWgMFCKI",
  authDomain: "project-pay-b2907.firebaseapp.com",
  projectId: "project-pay-b2907",
  storageBucket: "project-pay-b2907.appspot.com",
  messagingSenderId: "1015663174601",
  appId: "1:1015663174601:web:d41aa5640e86ea0ac53e18",
};

const app = initializeApp(firebaseConfig);
const authService = getAuth(app);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log(" 성공");
  })
  .catch((error) => {
    console.error(" 실패:", error);
  });

const db = getFirestore(app);

export { authService, db };
