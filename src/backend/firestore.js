
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function addResult(data) {
    try {
        const docRef = await addDoc(collection(db, 'results'), data);
    } catch(err) {
        console.log(err);
    }
}

export async function getResult(date) {
    try {
        const data = [];
        const q = query(collection(db, 'results'), where('date', '==', date))
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => data.push(doc.data()));
        return { data, status: 'success' };
    } catch(err) {
        console.log(err);
    }
}