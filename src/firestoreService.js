// src/firestoreService.js
import { db } from "./firebase";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

/* ===========================
   DONATION SETTINGS
=========================== */

// Fetch donation/bank details
export const fetchBankDetails = async () => {
  try {
    const docRef = doc(db, "donationSettings", "donationDetails");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    console.log("No bank details found in Firestore!");
    return null;
  } catch (error) {
    console.error("Error fetching bank details:", error);
    return null;
  }
};

// Update donation/bank details
export const updateBankDetails = async (newData) => {
  try {
    const docRef = doc(db, "donationSettings", "donationDetails");
    await updateDoc(docRef, newData);
    console.log("Bank details updated successfully!");
  } catch (error) {
    console.error("Error updating bank details:", error);
  }
};

/* ===========================
   PROGRAMS SETTINGS
=========================== */

// Fetch all programs
export const fetchPrograms = async () => {
  try {
    const programsRef = collection(db, "programs");
    const snapshot = await getDocs(programsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
};

// Add a new program
export const addProgram = async (programData) => {
  try {
    const programsRef = collection(db, "programs");
    await addDoc(programsRef, programData);
    console.log("Program added successfully!");
  } catch (error) {
    console.error("Error adding program:", error);
    throw error;
  }
};

// Update a program
export const updateProgram = async (id, updatedData) => {
  try {
    const programRef = doc(db, "programs", id);
    await updateDoc(programRef, updatedData);
    console.log("Program updated successfully!");
  } catch (error) {
    console.error("Error updating program:", error);
    throw error;
  }
};

// Delete a program
export const deleteProgram = async (id) => {
  try {
    const programRef = doc(db, "programs", id);
    await deleteDoc(programRef);
    console.log("Program deleted successfully!");
  } catch (error) {
    console.error("Error deleting program:", error);
    throw error;
  }
};

/* ===========================
   YOUTUBE LIVE LINK
=========================== */

// Fetch YouTube Live Link
export const fetchYouTubeLink = async () => {
  try {
    const docRef = doc(db, "liveSettings", "youtubeLink");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().url;
    } else {
      console.warn("No YouTube link found in Firestore!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching YouTube link:", error);
    return null;
  }
};

// Update YouTube Live Link (for AdminDashboard)
export const updateYouTubeLink = async (newUrl) => {
  try {
    const docRef = doc(db, "liveSettings", "youtubeLink");
    await setDoc(docRef, { url: newUrl }, { merge: true });
    console.log("YouTube link updated successfully!");
  } catch (error) {
    console.error("Error updating YouTube link:", error);
  }
};