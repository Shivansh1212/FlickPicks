
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmDx_paUbn3d6sDj3OxMLA-QQEHb_XLR0",
  authDomain: "flickpicks-57d38.firebaseapp.com",
  projectId: "flickpicks-57d38",
  storageBucket: "flickpicks-57d38.appspot.com",
  messagingSenderId: "979866148099",
  appId: "1:979866148099:web:341a708ec0396dc7e19d36"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const moviesRef= collection(db, "movies");
export const reviewsRef= collection(db, "reviews");
export const usersRef= collection(db, "users");
export default app;