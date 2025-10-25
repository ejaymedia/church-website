// src/firestoreService.js
import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

/* ===========================
   DONATION SETTINGS
=========================== */
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

export const addProgram = async (programData) => {
  try {
    const programsRef = collection(db, "programs");
    const docRef = await addDoc(programsRef, programData);
    console.log("Program added successfully!");
    return docRef.id;
  } catch (error) {
    console.error("Error adding program:", error);
    throw error;
  }
};

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
export const fetchYouTubeLink = async () => {
  try {
    const docRef = doc(db, "liveSettings", "youtubeLink");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data().url;
    return null;
  } catch (error) {
    console.error("Error fetching YouTube link:", error);
    return null;
  }
};

export const updateYouTubeLink = async (newUrl) => {
  try {
    const docRef = doc(db, "liveSettings", "youtubeLink");
    await setDoc(docRef, { url: newUrl }, { merge: true });
    console.log("YouTube link updated successfully!");
  } catch (error) {
    console.error("Error updating YouTube link:", error);
  }
};

/* ===========================
   CONTACT MESSAGES
=========================== */

// Fetch all contact messages
export const fetchContactMessages = async () => {
  try {
    const messagesRef = collection(db, "contactMessages");
    const snapshot = await getDocs(messagesRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
};

// Add a contact message
export const addContactMessage = async (messageObj) => {
  try {
    const messagesRef = collection(db, "contactMessages");
    await addDoc(messagesRef, { ...messageObj, read: false });
    console.log("Contact message added successfully!");
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw error;
  }
};

// Mark a message as read
export const markMessageRead = async (id) => {
  try {
    const msgRef = doc(db, "contactMessages", id);
    await updateDoc(msgRef, { read: true });
    console.log("Message marked as read!");
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

// Delete a message
export const deleteMessage = async (id) => {
  try {
    const msgRef = doc(db, "contactMessages", id);
    await deleteDoc(msgRef);
    console.log("Message deleted successfully!");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};