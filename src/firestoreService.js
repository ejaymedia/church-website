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

// ========================
// RESOURCES: SERMONS
// ========================

export const fetchSermons = async () => {
  try {
    const sermonsRef = collection(db, "resources", "sermons", "list");
    const snapshot = await getDocs(sermonsRef);
    const sermons = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Fetch viewMoreUrl from parent "resources/sermons" doc
    const viewMoreDocRef = doc(db, "resources", "sermons");
    const viewMoreDocSnap = await getDoc(viewMoreDocRef);
    const viewMoreUrl = viewMoreDocSnap.exists() ? viewMoreDocSnap.data().viewMoreUrl : "#";

    return { sermons, viewMoreUrl };
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return { sermons: [], viewMoreUrl: "#" };
  }
};

export const addSermon = async (sermonData) => {
  const sermonsRef = collection(db, "resources", "sermons", "list");
  const docRef = await addDoc(sermonsRef, sermonData);
  return docRef.id;
};

export const updateSermon = async (id, updatedData) => {
  const sermonRef = doc(db, "resources", "sermons", "list", id);
  await updateDoc(sermonRef, updatedData);
};

export const deleteSermon = async (id) => {
  const sermonRef = doc(db, "resources", "sermons", "list", id);
  await deleteDoc(sermonRef);
};

// View More Link for Sermons
export const updateSermonViewMoreUrl = async (url) => {
  const docRef = doc(db, "resources", "sermons");
  await setDoc(docRef, { viewMoreUrl: url });
};

// ========================
// RESOURCES: FREE EBOOKS
// ========================

export const fetchFreeEbooks = async () => {
  const ebooksRef = collection(db, "resources", "ebooks", "free");
  const snapshot = await getDocs(ebooksRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addFreeEbook = async (ebookData) => {
  const ebooksRef = collection(db, "resources", "ebooks", "free");
  const docRef = await addDoc(ebooksRef, ebookData);
  return docRef.id;
};

export const updateFreeEbook = async (id, updatedData) => {
  const ebookRef = doc(db, "resources", "ebooks", "free", id);
  await updateDoc(ebookRef, updatedData);
};

export const deleteFreeEbook = async (id) => {
  const ebookRef = doc(db, "resources", "ebooks", "free", id);
  await deleteDoc(ebookRef);
};

// ========================
// RESOURCES: PREMIUM EBOOKS
// ========================
export const fetchPremiumEbooks = async () => {
  const ebooksRef = collection(db, "resources", "ebooks", "premium");
  const snapshot = await getDocs(ebooksRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    downloadLink: doc.data().downloadLink || "",
  }));
};

export const addPremiumEbook = async (ebookData) => {
  const ebooksRef = collection(db, "resources", "ebooks", "premium");
  const docRef = await addDoc(ebooksRef, {
    title: ebookData.title,
    price: ebookData.price,
    image: ebookData.image,
    downloadLink: ebookData.downloadLink || "",
  });
  return docRef.id;
};

export const updatePremiumEbook = async (id, updatedData) => {
  const ebookRef = doc(db, "resources", "ebooks", "premium", id);
  await updateDoc(ebookRef, updatedData);
};

export const deletePremiumEbook = async (id) => {
  const ebookRef = doc(db, "resources", "ebooks", "premium", id);
  await deleteDoc(ebookRef);
};