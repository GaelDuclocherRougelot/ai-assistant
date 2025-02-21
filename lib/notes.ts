import { db } from "@/lib/firebase";
import { log } from "console";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, where, query } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';

async function addNote(note) {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user) {
        throw new Error("User not authenticated");
    }
	try {
		const docRef = await addDoc(collection(db, "notes"), {
            ...note,
            user_id: user.uid
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}
async function deleteNote(noteId: string) {
	await deleteDoc(doc(db, "notes", noteId));
}
async function updateNote(noteId: string, updatedData: any) {
	const noteRef = doc(db, "notes", noteId);
	await updateDoc(noteRef, updatedData);
}
async function getNotes() {
	const user = JSON.parse(localStorage.getItem("user"));
	if(!user) {
		throw new Error("User not authenticated");
	}
	const notesSnapshot = await getDocs(collection(db, "notes"));
	const notesList = notesSnapshot.docs
		.filter(doc => doc.data().user_id === user.uid)
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

	return notesList;
}


async function extractDateFromQuery(query) {
	const datePattern = /(\d{1,2})\s(février|janvier|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/;
	const match = query.match(datePattern);
	if (match) {
		const day = parseInt(match[1], 10);
		const month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"].indexOf(match[2]) + 1;
		const year = new Date().getFullYear();
		return new Date(year, month - 1, day);
	}
	return null;
}

async function fetchNotesForDate(date) {
    const notesCollectionRef = collection(db, "notes");
    
    // Créer le timestamp pour 00:00:00 du jour en question
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
    
    // Créer le timestamp pour 23:59:59 du même jour
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    const endOfDayTimestamp = Timestamp.fromDate(endOfDay);
    
    // Mettre à jour la requête pour chercher les documents dans cette plage
    const q = query(notesCollectionRef, where("date", ">=", startOfDayTimestamp), where("date", "<=", endOfDayTimestamp));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    return querySnapshot.docs.map(doc => doc.data());
}
export { addNote, deleteNote, getNotes, updateNote, extractDateFromQuery, fetchNotesForDate };
