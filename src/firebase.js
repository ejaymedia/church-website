import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBh_n_4YLe6w26_CbRR-1toZfv0nD3GlTU",
  authDomain: "church-website-25.firebaseapp.com",
  projectId: "church-website-25",
  storageBucket: "church-website-25.firebasestorage.app",
  messagingSenderId: "18049781291",
  appId: "1:18049781291:web:c93e8b2639b1fd9f0e246e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);