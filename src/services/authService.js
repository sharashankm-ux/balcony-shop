import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export const registerUser = async (
  email,
  password,
  role
) => {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,

    role,

    profileCompleted: false,

    name: "",

    photo: "",

    mobile: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

    createdAt: serverTimestamp(),
  });

  return user;
};

export const loginUser = async (
  email,
  password
) => {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  const userDoc = await getDoc(
    doc(db, "users", user.uid)
  );

  if (!userDoc.exists()) {
    throw new Error("User profile not found.");
  }

  return {
    firebaseUser: user,
    profile: userDoc.data(),
  };
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const forgotPassword = async (
  email
) => {
  await sendPasswordResetEmail(
    auth,
    email
  );
};