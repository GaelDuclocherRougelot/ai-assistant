import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

async function addNote(note) {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        ...note,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
 async function deleteNote(noteId) {
    await deleteDoc(doc(db, "notes", noteId));
  } 
  async function updateNote(noteId, updatedData) {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, updatedData);
  } 
async function getNotes() {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    const notesList = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return notesList;
  }

  export { addNote, deleteNote, updateNote, getNotes };