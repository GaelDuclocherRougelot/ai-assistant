import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

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
	const notesSnapshot = await getDocs(collection(db, "notes"));
	const notesList = notesSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return notesList;
}

export { addNote, deleteNote, getNotes, updateNote };
