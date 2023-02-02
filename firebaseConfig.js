import { initializeApp } from "firebase/app";

/* IMportando recursos da biblioteca de autenticação do firebase*/
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzhgwN7ghUPSznBZGLxvmw0hnniUgPpoA",
  authDomain: "app-autenticacao-8db99.firebaseapp.com",
  projectId: "app-autenticacao-8db99",
  storageBucket: "app-autenticacao-8db99.appspot.com",
  messagingSenderId: "67057514744",
  appId: "1:67057514744:web:eb84ccd6a401c30189e30d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
