import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWVAGvWTD9Mc-jPCSaSHmP22UFWgMFCKI",
  authDomain: "project-pay-b2907.firebaseapp.com",
  projectId: "project-pay-b2907",
  storageBucket: "project-pay-b2907.appspot.com",
  messagingSenderId: "1015663174601",
  appId: "1:1015663174601:web:d41aa5640e86ea0ac53e18",
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
