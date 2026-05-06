import { auth } from "./config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, browserSessionPersistence, setPersistence } from "firebase/auth";

// 로그인 (브라우저 닫으면 로그아웃)
export const login = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

// 로그아웃
export const logout = () => {
  return signOut(auth);
};

// 로그인 상태 감지
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
