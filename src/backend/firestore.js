import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

export async function addResult(data) {
  try {
    const docRef = await addDoc(collection(db, "results"), data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getResult(date) {
  try {
    const data = [];
    const q = query(
      collection(db, "results"), 
      where("date", "==", date), 
      orderBy('time', 'asc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      data.push(obj);
    });
    return { data, status: "success" };
  } catch (err) {
    console.log(err);
  }
}

export async function deleteResult(id) {
  try {
    await deleteDoc(doc(db, "results", id));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
