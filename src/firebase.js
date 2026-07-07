import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHhsE4ipkLHHKomNITOh7mX4pmWvgRJuI",
  authDomain: "balconyshop-57e9f.firebaseapp.com",
  projectId: "balconyshop-57e9f",
  storageBucket: "balconyshop-57e9f.firebasestorage.app",
  messagingSenderId: "140958836602",
  appId: "1:140958836602:web:fbeac1c57de43b4a5f18c3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;