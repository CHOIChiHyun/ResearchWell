import { db } from "./config.js";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const COLLECTION_NAME = "press-releases";

// 게시글 목록 조회 (공개된 것만)
export const getPressReleases = async () => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("isPublished", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 전체 목록 조회 (관리자용)
export const getAllPressReleases = async () => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 단일 게시글 조회
export const getPressRelease = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};

// 게시글 생성
export const createPressRelease = async (data) => {
  return addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

// 게시글 수정
export const updatePressRelease = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// 게시글 삭제
export const deletePressRelease = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return deleteDoc(docRef);
};
