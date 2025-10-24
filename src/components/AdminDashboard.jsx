import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const AdminDashboard = () => {

  const [bankDetails, setBankDetails] = useState({
    building: { accountName: "", accountNumber: "", bank: "" },
    mission: { accountName: "", accountNumber: "", bank: "" },
    tithe: { accountName: "", accountNumber: "", bank: "" },
    care: { accountName: "", accountNumber: "", bank: "" },
  });

  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState({
    category: "weekly",
    date: "",
    day: "",
    title: "",
    location: "",
    description: "",
  });

  const [youtubeLink, setYoutubeLink] = useState("");
  const [editProgramId, setEditProgramId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingProgram, setAddingProgram] = useState(false);
  const [updatingProgram, setUpdatingProgram] = useState(false);
  const [savingYoutube, setSavingYoutube] = useState(false);

  // Collapsible states (all collapsed initially)
  const [showBankSection, setShowBankSection] = useState(false);
  const [showProgramsSection, setShowProgramsSection] = useState(false);
  const [showYoutubeSection, setShowYoutubeSection] = useState(false);

  // ------------------ FETCH DATA ------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bank details
        const bankRef = doc(db, "donationSettings", "donationDetails");
        const bankSnap = await getDoc(bankRef);
        if (bankSnap.exists()) setBankDetails(bankSnap.data());

        // Fetch programs
        const programsRef = collection(db, "programs");
        const querySnapshot = await getDocs(programsRef);
        const fetchedPrograms = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrograms(fetchedPrograms);

        // Fetch YouTube link
        const youtubeRef = doc(db, "liveSettings", "youtubeLink");
        const youtubeSnap = await getDoc(youtubeRef);
        if (youtubeSnap.exists()) {
          setYoutubeLink(youtubeSnap.data().url || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ------------------ BANK DETAILS ------------------
  const handleChange = (e, category, field) => {
    const value = e.target.value;
    setBankDetails((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "donationSettings", "donationDetails"), bankDetails);
      alert("Bank details updated successfully!");
    } catch (error) {
      console.error("Error updating bank details:", error.message);
      alert("Failed to update bank details.");
    } finally {
      setSaving(false);
    }
  };

  // ------------------ YOUTUBE LINK ------------------
  const handleYoutubeSave = async (e) => {
    e.preventDefault();
    setSavingYoutube(true);
    try {
      await setDoc(doc(db, "liveSettings", "youtubeLink"), { url: youtubeLink });
      alert("YouTube link updated successfully!");
    } catch (error) {
      console.error("Error updating YouTube link:", error.message);
      alert("Failed to update YouTube link.");
    } finally {
      setSavingYoutube(false);
    }
  };

  // ------------------ PROGRAM MANAGEMENT ------------------
  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    setProgram((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    setAddingProgram(true);
    try {
      const programsRef = collection(db, "programs");
      const docRef = await addDoc(programsRef, program);
      setPrograms((prev) => [...prev, { id: docRef.id, ...program }]);
      alert("Program added successfully!");
      setProgram({
        category: "weekly",
        date: "",
        day: "",
        title: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding program:", error);
    } finally {
      setAddingProgram(false);
    }
  };

  const handleEditProgram = (prog) => {
    setEditProgramId(prog.id);
    setProgram(prog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateProgram = async (e) => {
    e.preventDefault();
    if (!editProgramId) return;

    setUpdatingProgram(true);
    try {
      const docRef = doc(db, "programs", editProgramId);
      await updateDoc(docRef, program);

      setPrograms((prev) =>
        prev.map((p) => (p.id === editProgramId ? { id: editProgramId, ...program } : p))
      );

      alert("Program updated successfully!");
      setEditProgramId(null);
      setProgram({
        category: "weekly",
        date: "",
        day: "",
        title: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating program:", error);
    } finally {
      setUpdatingProgram(false);
    }
  };

  const handleDeleteProgram = async (id) => {
    if (!window.confirm("Delete this program?")) return;

    try {
      await deleteDoc(doc(db, "programs", id));
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      alert("Program deleted successfully!");
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const { logout } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700">
        Loading dashboard...
      </div>
    );

  const groupedPrograms = {
    weekly: programs.filter((p) => p.category === "weekly"),
    monthly: programs.filter((p) => p.category === "monthly"),
    yearly: programs.filter((p) => p.category === "yearly"),
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl bg-green-50 shadow-lg rounded-2xl p-6 sm:p-10 border border-green-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-green-800">Admin Dashboard 🛠️</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* ========== BANK DETAILS ========== */}
        <div className="mb-8">
          <button
            onClick={() => setShowBankSection((prev) => !prev)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-5 py-3 rounded-md"
          >
            <span className="text-lg font-semibold">Donation Bank Details</span>
            <span>{showBankSection ? "−" : "+"}</span>
          </button>

          {showBankSection && (
            <form
              onSubmit={handleSave}
              className="space-y-8 bg-white border border-green-100 rounded-lg shadow p-6 mt-4"
            >
              {Object.keys(bankDetails).map((category) => (
                <div key={category} className="p-5 border border-green-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700 mb-4 capitalize">
                    {category === "tithe"
                      ? "Tithe, Offerings & Seeds"
                      : category === "mission"
                      ? "Mission Offerings"
                      : category === "building"
                      ? "Building Project"
                      : "Care Ministry"}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {["accountName", "accountNumber", "bank"].map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field.replace("account", "Account ")}
                        value={bankDetails[category][field]}
                        onChange={(e) => handleChange(e, category, field)}
                        className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-8 py-3 rounded-full text-white transition ${
                    saving ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
                  }`}
                >
                  {saving ? "Saving..." : "Save Bank Details"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========== YOUTUBE LINK ========== */}
        <div className="mb-8">
          <button
            onClick={() => setShowYoutubeSection((prev) => !prev)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-5 py-3 rounded-md"
          >
            <span className="text-lg font-semibold">YouTube Live Link</span>
            <span>{showYoutubeSection ? "−" : "+"}</span>
          </button>

          {showYoutubeSection && (
            <form
              onSubmit={handleYoutubeSave}
              className="bg-white border border-green-100 rounded-lg shadow p-6 mt-4"
            >
              <input
                type="text"
                placeholder="Enter YouTube live embed link"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                className="w-full border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none mb-4"
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={savingYoutube}
                  className={`px-8 py-3 rounded-full text-white transition ${
                    savingYoutube
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                >
                  {savingYoutube ? "Saving..." : "Save YouTube Link"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========== PROGRAMS SECTION ========== */}
        <div>
          <button
            onClick={() => setShowProgramsSection((prev) => !prev)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-5 py-3 rounded-md"
          >
            <span className="text-lg font-semibold">Programs</span>
            <span>{showProgramsSection ? "−" : "+"}</span>
          </button>

          {showProgramsSection && (
            <div className="mt-4 bg-white border border-green-100 rounded-lg shadow p-6">
              {/* Program Form */}
              <form
                onSubmit={editProgramId ? handleUpdateProgram : handleAddProgram}
                className="space-y-6 mb-8"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <select
                    name="category"
                    value={program.category}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <input
                    type="datetime-local"
                    name="date"
                    value={program.date}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <input
                    type="text"
                    name="day"
                    placeholder="e.g. Sun 9:00 AM"
                    value={program.day}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Program Title"
                    value={program.title}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Main Auditorium"
                    value={program.location}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Brief description..."
                    value={program.description}
                    onChange={handleProgramChange}
                    className="lg:col-span-3 border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={addingProgram || updatingProgram}
                    className={`px-8 py-3 rounded-full text-white transition ${
                      addingProgram || updatingProgram
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                  >
                    {editProgramId
                      ? updatingProgram
                        ? "Updating..."
                        : "Update Program"
                      : addingProgram
                      ? "Adding..."
                      : "Add Program"}
                  </button>
                </div>
              </form>

              {/* List of Programs */}
              {Object.entries(groupedPrograms).map(([cat, list]) => (
                <div key={cat} className="mb-8">
                  <h3 className="text-lg font-semibold text-green-800 capitalize mb-3 border-b border-green-200 pb-1">
                    {cat} Programs
                  </h3>
                  {list.length === 0 ? (
                    <p className="text-gray-500 italic text-sm">
                      No {cat} programs yet.
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {list.map((p) => (
                        <div
                          key={p.id}
                          className="bg-white border border-green-100 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <h4 className="font-semibold text-green-800">
                              {p.title}
                            </h4>
                            <p className="text-sm text-gray-600">{p.day}</p>
                            <p className="text-sm text-gray-600">
                              {p.location}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {p.description}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-3 sm:mt-0">
                            <button
                              onClick={() => handleEditProgram(p)}
                              className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProgram(p.id)}
                              className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;