import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchBankDetails,
  updateBankDetails,
  fetchPrograms,
  addProgram,
  updateProgram,
  deleteProgram,
  fetchYouTubeLink,
  updateYouTubeLink,
  fetchContactMessages,
  markMessageRead,
  deleteMessage,
  fetchSermons,
  addSermon,
  updateSermon,
  deleteSermon,
  updateSermonViewMoreUrl,
  fetchFreeEbooks,
  addFreeEbook,
  updateFreeEbook,
  deleteFreeEbook,
  fetchPremiumEbooks,
  addPremiumEbook,
  updatePremiumEbook,
  deletePremiumEbook
} from "../firestoreService";

const AdminDashboard = () => {
  // ------------------ ORIGINAL STATES ------------------
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
  const [contactMessages, setContactMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingProgram, setAddingProgram] = useState(false);
  const [updatingProgram, setUpdatingProgram] = useState(false);
  const [savingYoutube, setSavingYoutube] = useState(false);

  const [showBankSection, setShowBankSection] = useState(false);
  const [showProgramsSection, setShowProgramsSection] = useState(false);
  const [showYoutubeSection, setShowYoutubeSection] = useState(false);
  const [showContactSection, setShowContactSection] = useState(false);

  const { logout } = useAuth();

  // ------------------ RESOURCES STATES ------------------
  const [sermons, setSermons] = useState([]); // array of {id, title, youtubeLink, thumbnail?}
  const [viewMoreUrl, setViewMoreUrl] = useState("https://www.youtube.com/@yourchurchchannel"); // default placeholder
  const [newSermon, setNewSermon] = useState({ title: "", youtubeLink: "", thumbnail: "" });
  const [editSermonId, setEditSermonId] = useState(null);

  const [freeEbooks, setFreeEbooks] = useState([]); // array of {id, title, imageLink, downloadLink}
  const [newFreeEbook, setNewFreeEbook] = useState({ title: "", imageLink: "", downloadLink: "" });
  const [editFreeEbookId, setEditFreeEbookId] = useState(null);

  const [premiumEbooks, setPremiumEbooks] = useState([]); // array of {id, title, imageLink, price}
  const [newPremiumEbook, setNewPremiumEbook] = useState({ title: "", imageLink: "", price: "" });
  const [editPremiumEbookId, setEditPremiumEbookId] = useState(null);

  const [savingSermon, setSavingSermon] = useState(false);
  const [savingEbook, setSavingEbook] = useState(false);
  const [savingViewMore, setSavingViewMore] = useState(false);

  const [showResourcesSection, setShowResourcesSection] = useState(false);

  // ------------------ FETCH DATA (original + resources) ------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch original data
        const [bankData, programsData, youtubeData, messagesData] = await Promise.all([
          fetchBankDetails(),
          fetchPrograms(),
          fetchYouTubeLink(),
          fetchContactMessages(),
        ]);

        if (bankData) setBankDetails(bankData);
        if (programsData) setPrograms(programsData);
        if (youtubeData) setYoutubeLink(youtubeData);
        if (messagesData) setContactMessages(messagesData);

        // fetch resources: sermons (and viewMoreUrl returned), free & premium ebooks
        const sermonsResult = await fetchSermons();
        // note: fetchSermons() in firestoreService returns { sermons, viewMoreUrl } per earlier setup
        if (sermonsResult) {
          if (Array.isArray(sermonsResult.sermons)) setSermons(sermonsResult.sermons);
          if (sermonsResult.viewMoreUrl) setViewMoreUrl(sermonsResult.viewMoreUrl);
        }

        const free = await fetchFreeEbooks();
        if (free) setFreeEbooks(free);

        const premium = await fetchPremiumEbooks();
        if (premium) setPremiumEbooks(premium);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ------------------ UTILITIES ------------------
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url, fallback) => {
    if (fallback) return fallback;
    const id = getYouTubeVideoId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  };

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
      await updateBankDetails(bankDetails);
      alert("Bank details updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update bank details");
    } finally {
      setSaving(false);
    }
  };

  // ------------------ YOUTUBE LINK ------------------
  const handleYoutubeSave = async (e) => {
    e.preventDefault();
    setSavingYoutube(true);
    try {
      await updateYouTubeLink(youtubeLink);
      alert("YouTube link updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update YouTube link");
    } finally {
      setSavingYoutube(false);
    }
  };

  // ------------------ PROGRAMS ------------------
  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    setProgram((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    setAddingProgram(true);
    try {
      const id = await addProgram(program);
      setPrograms((prev) => [...prev, { id, ...program }]);
      alert("Program added successfully!");
      setProgram({
        category: "weekly",
        date: "",
        day: "",
        title: "",
        location: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add program");
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
      await updateProgram(editProgramId, program);
      setPrograms((prev) => prev.map((p) => (p.id === editProgramId ? { id: editProgramId, ...program } : p)));
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
    } catch (err) {
      console.error(err);
      alert("Failed to update program");
    } finally {
      setUpdatingProgram(false);
    }
  };

  const handleDeleteProgram = async (id) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await deleteProgram(id);
      setPrograms((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ CONTACT MESSAGES ------------------
  const handleMarkAsRead = async (id) => {
    try {
      await markMessageRead(id);
      setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      setContactMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ SERMONS HANDLERS ------------------
  const handleSermonFieldChange = (e) => {
    const { name, value } = e.target;
    setNewSermon((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSermon = async (e) => {
    e.preventDefault();
    if (!newSermon.title || !newSermon.youtubeLink) return alert("Title and YouTube link are required.");
    setSavingSermon(true);
    try {
      const id = await addSermon({
        title: newSermon.title,
        youtubeLink: newSermon.youtubeLink,
        thumbnail: newSermon.thumbnail || getYouTubeThumbnail(newSermon.youtubeLink),
      });
      setSermons((prev) => [...prev, { id, title: newSermon.title, youtubeLink: newSermon.youtubeLink, thumbnail: newSermon.thumbnail }]);
      setNewSermon({ title: "", youtubeLink: "", thumbnail: "" });
      alert("Sermon added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add sermon");
    } finally {
      setSavingSermon(false);
    }
  };

  const handleEditSermon = (sermon) => {
    setEditSermonId(sermon.id);
    setNewSermon({ title: sermon.title || "", youtubeLink: sermon.youtubeLink || "", thumbnail: sermon.thumbnail || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateSermon = async (e) => {
    e.preventDefault();
    if (!editSermonId) return;
    setSavingSermon(true);
    try {
      const updated = {
        title: newSermon.title,
        youtubeLink: newSermon.youtubeLink,
        thumbnail: newSermon.thumbnail || getYouTubeThumbnail(newSermon.youtubeLink),
      };
      await updateSermon(editSermonId, updated);
      setSermons((prev) => prev.map((s) => (s.id === editSermonId ? { id: editSermonId, ...updated } : s)));
      setEditSermonId(null);
      setNewSermon({ title: "", youtubeLink: "", thumbnail: "" });
      alert("Sermon updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update sermon");
    } finally {
      setSavingSermon(false);
    }
  };

  const handleDeleteSermon = async (id) => {
    if (!window.confirm("Delete this sermon?")) return;
    try {
      await deleteSermon(id);
      setSermons((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveViewMoreUrl = async (e) => {
    e.preventDefault();
    setSavingViewMore(true);
    try {
      await updateSermonViewMoreUrl(viewMoreUrl);
      alert("View more YouTube link saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save view more link");
    } finally {
      setSavingViewMore(false);
    }
  };

  // ------------------ FREE EBOOKS HANDLERS ------------------
  const handleFreeEbookChange = (e) => {
    const { name, value } = e.target;
    setNewFreeEbook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFreeEbook = async (e) => {
    e.preventDefault();
    if (!newFreeEbook.title || !newFreeEbook.imageLink || !newFreeEbook.downloadLink)
      return alert("All fields required for free ebook.");
    setSavingEbook(true);
    try {
      const id = await addFreeEbook(newFreeEbook);
      setFreeEbooks((prev) => [...prev, { id, ...newFreeEbook }]);
      setNewFreeEbook({ title: "", imageLink: "", downloadLink: "" });
      alert("Free ebook added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add free ebook");
    } finally {
      setSavingEbook(false);
    }
  };

  const handleEditFreeEbook = (ebook) => {
    setEditFreeEbookId(ebook.id);
    setNewFreeEbook({ title: ebook.title || "", imageLink: ebook.imageLink || "", downloadLink: ebook.downloadLink || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateFreeEbook = async (e) => {
    e.preventDefault();
    if (!editFreeEbookId) return;
    setSavingEbook(true);
    try {
      await updateFreeEbook(editFreeEbookId, newFreeEbook);
      setFreeEbooks((prev) => prev.map((f) => (f.id === editFreeEbookId ? { id: editFreeEbookId, ...newFreeEbook } : f)));
      setEditFreeEbookId(null);
      setNewFreeEbook({ title: "", imageLink: "", downloadLink: "" });
      alert("Free ebook updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update free ebook");
    } finally {
      setSavingEbook(false);
    }
  };

  const handleDeleteFreeEbook = async (id) => {
    if (!window.confirm("Delete this free ebook?")) return;
    try {
      await deleteFreeEbook(id);
      setFreeEbooks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ PREMIUM EBOOKS HANDLERS ------------------
  const handlePremiumEbookChange = (e) => {
    const { name, value } = e.target;
    setNewPremiumEbook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPremiumEbook = async (e) => {
    e.preventDefault();
    if (!newPremiumEbook.title || !newPremiumEbook.imageLink || !newPremiumEbook.price)
      return alert("All fields required for premium ebook.");
    setSavingEbook(true);
    try {
      const id = await addPremiumEbook(newPremiumEbook);
      setPremiumEbooks((prev) => [...prev, { id, ...newPremiumEbook }]);
      setNewPremiumEbook({ title: "", imageLink: "", price: "" });
      alert("Premium ebook added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add premium ebook");
    } finally {
      setSavingEbook(false);
    }
  };

  const handleEditPremiumEbook = (ebook) => {
    setEditPremiumEbookId(ebook.id);
    setNewPremiumEbook({ title: ebook.title || "", imageLink: ebook.imageLink || "", price: ebook.price || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdatePremiumEbook = async (e) => {
    e.preventDefault();
    if (!editPremiumEbookId) return;
    setSavingEbook(true);
    try {
      await updatePremiumEbook(editPremiumEbookId, newPremiumEbook);
      setPremiumEbooks((prev) => prev.map((p) => (p.id === editPremiumEbookId ? { id: editPremiumEbookId, ...newPremiumEbook } : p)));
      setEditPremiumEbookId(null);
      setNewPremiumEbook({ title: "", imageLink: "", price: "" });
      alert("Premium ebook updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update premium ebook");
    } finally {
      setSavingEbook(false);
    }
  };

  const handleDeletePremiumEbook = async (id) => {
    if (!window.confirm("Delete this premium ebook?")) return;
    try {
      await deletePremiumEbook(id);
      setPremiumEbooks((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ RENDER ------------------
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
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-3 sm:px-6 md:px-10">
      <div className="w-full max-w-6xl bg-green-50 shadow-lg rounded-2xl p-4 sm:p-8 border border-green-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3 text-center sm:text-left">
          <h1 className="text-2xl font-semibold text-green-800">Admin Dashboard 🛠️</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md w-full sm:w-auto transition"
          >
            Logout
          </button>
        </div>

        {/* BANK DETAILS */}
        <div className="mb-8">
          <button
            onClick={() => setShowBankSection(!showBankSection)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-4 py-3 rounded-md text-base sm:text-lg"
          >
            <span className="font-semibold">Donation Bank Details</span>
            <span>{showBankSection ? "−" : "+"}</span>
          </button>

          {showBankSection && (
            <form onSubmit={handleSave} className="space-y-8 bg-white border border-green-100 rounded-lg shadow p-4 sm:p-6 mt-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["accountName", "accountNumber", "bank"].map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field.replace("account", "Account ")}
                        value={bankDetails[category][field]}
                        onChange={(e) => handleChange(e, category, field)}
                        className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none w-full"
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full sm:w-auto px-8 py-3 rounded-full text-white transition ${saving ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}`}
                >
                  {saving ? "Saving..." : "Save Bank Details"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* YOUTUBE SECTION */}
        <div className="mb-8">
          <button
            onClick={() => setShowYoutubeSection(!showYoutubeSection)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-4 py-3 rounded-md text-base sm:text-lg"
          >
            <span className="font-semibold">YouTube Live Link</span>
            <span>{showYoutubeSection ? "−" : "+"}</span>
          </button>

          {showYoutubeSection && (
            <form onSubmit={handleYoutubeSave} className="bg-white border border-green-100 rounded-lg shadow p-4 sm:p-6 mt-4">
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
                  className={`w-full sm:w-auto px-8 py-3 rounded-full text-white transition ${savingYoutube ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}`}
                >
                  {savingYoutube ? "Saving..." : "Save YouTube Link"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* PROGRAMS SECTION */}
        <div className="mb-8">
          <button
            onClick={() => setShowProgramsSection(!showProgramsSection)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-4 py-3 rounded-md text-base sm:text-lg"
          >
            <span className="font-semibold">Programs</span>
            <span>{showProgramsSection ? "−" : "+"}</span>
          </button>

          {showProgramsSection && (
            <div className="mt-4 bg-white border border-green-100 rounded-lg shadow p-4 sm:p-6">
              <form onSubmit={editProgramId ? handleUpdateProgram : handleAddProgram} className="space-y-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <select
                    name="category"
                    value={program.category}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none w-full"
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
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none w-full"
                  />
                  <input
                    type="text"
                    name="day"
                    placeholder="e.g. Sun 9:00 AM"
                    value={program.day}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none w-full"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Program Title"
                    value={program.title}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none w-full"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={program.location}
                    onChange={handleProgramChange}
                    className="border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none w-full"
                  />
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Brief description..."
                    value={program.description}
                    onChange={handleProgramChange}
                    className="md:col-span-3 border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none w-full"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={addingProgram || updatingProgram}
                    className={`w-full sm:w-auto px-8 py-3 rounded-full text-white transition ${addingProgram || updatingProgram ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}`}
                  >
                    {editProgramId ? (updatingProgram ? "Updating..." : "Update Program") : (addingProgram ? "Adding..." : "Add Program")}
                  </button>
                </div>
              </form>

              {/* LIST OF PROGRAMS */}
              {Object.entries(groupedPrograms).map(([cat, list]) => (
                <div key={cat} className="mb-8">
                  <h3 className="text-lg font-semibold text-green-800 capitalize mb-3 border-b border-green-200 pb-1">
                    {cat} Programs
                  </h3>
                  {list.length === 0 ? (
                    <p className="text-gray-500 italic text-sm">No {cat} programs yet.</p>
                  ) : (
                    <div className="grid gap-4">
                      {list.map((p) => (
                        <div key={p.id} className="bg-white border border-green-100 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 break-words">
                          <div>
                            <h4 className="font-semibold text-green-800">{p.title}</h4>
                            <p className="text-sm text-gray-600">{p.day}</p>
                            <p className="text-sm text-gray-600">{p.location}</p>
                            <p className="text-sm text-gray-700 mt-1 break-words">{p.description}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button onClick={() => handleEditProgram(p)} className="px-3 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 w-full sm:w-auto">Edit</button>
                            <button onClick={() => handleDeleteProgram(p.id)} className="px-3 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700 w-full sm:w-auto">Delete</button>
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

        {/* ======================= RESOURCES MANAGEMENT ======================= */}
        <div className="mb-8">
          <button
            onClick={() => setShowResourcesSection(!showResourcesSection)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-4 py-3 rounded-md text-base sm:text-lg"
          >
            <span className="font-semibold">Resources (Sermons & Ebooks)</span>
            <span>{showResourcesSection ? "−" : "+"}</span>
          </button>

          {showResourcesSection && (
            <div className="mt-4 bg-white border border-green-100 rounded-lg shadow p-4 sm:p-6 space-y-6">
              {/* SERMONS */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Sermon Videos</h3>

                <form onSubmit={editSermonId ? handleUpdateSermon : handleAddSermon} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newSermon.title}
                    onChange={handleSermonFieldChange}
                    className="border border-green-200 rounded-md px-3 py-2 outline-none w-full md:col-span-1"
                  />
                  <input
                    type="text"
                    name="youtubeLink"
                    placeholder="YouTube Link"
                    value={newSermon.youtubeLink}
                    onChange={handleSermonFieldChange}
                    className="border border-green-200 rounded-md px-3 py-2 outline-none w-full md:col-span-2"
                  />
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="Thumbnail URL (optional)"
                    value={newSermon.thumbnail}
                    onChange={handleSermonFieldChange}
                    className="border border-green-200 rounded-md px-3 py-2 outline-none w-full"
                  />
                  <div className="md:col-span-4 flex gap-2">
                    <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                      {editSermonId ? (savingSermon ? "Updating..." : "Update Sermon") : (savingSermon ? "Adding..." : "Add Sermon")}
                    </button>
                    {editSermonId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditSermonId(null);
                          setNewSermon({ title: "", youtubeLink: "", thumbnail: "" });
                        }}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                <div className="grid md:grid-cols-2 gap-4">
                  {sermons.length === 0 ? (
                    <p className="text-gray-500 italic">No sermons added yet.</p>
                  ) : (
                    sermons.map((s) => (
                      <div key={s.id} className="border rounded p-3 flex gap-3 items-start">
                        <img src={getYouTubeThumbnail(s.youtubeLink, s.thumbnail)} alt={s.title} className="w-32 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-semibold text-green-800">{s.title}</p>
                          <p className="text-xs text-gray-600 break-words">{s.youtubeLink}</p>
                          <div className="mt-2 flex gap-2">
                            <button onClick={() => handleEditSermon(s)} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Edit</button>
                            <button onClick={() => handleDeleteSermon(s.id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* View More Link */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">"View More" Link (channel or playlist)</h4>
                  <form onSubmit={handleSaveViewMoreUrl} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Channel or playlist URL"
                      value={viewMoreUrl}
                      onChange={(e) => setViewMoreUrl(e.target.value)}
                      className="flex-1 border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                      {savingViewMore ? "Saving..." : "Save"}
                    </button>
                  </form>
                </div>
              </div>

              {/* EBOOKS */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Ebooks</h3>

                {/* FREE EBOOKS */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Add / Edit Free Ebook</h4>
                  <form onSubmit={editFreeEbookId ? handleUpdateFreeEbook : handleAddFreeEbook} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={newFreeEbook.title}
                      onChange={handleFreeEbookChange}
                      className="border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      name="imageLink"
                      placeholder="Image URL"
                      value={newFreeEbook.imageLink}
                      onChange={handleFreeEbookChange}
                      className="border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      name="downloadLink"
                      placeholder="Download Link"
                      value={newFreeEbook.downloadLink}
                      onChange={handleFreeEbookChange}
                      className="border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                        {editFreeEbookId ? (savingEbook ? "Updating..." : "Update Free Ebook") : (savingEbook ? "Adding..." : "Add Free Ebook")}
                      </button>
                      {editFreeEbookId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditFreeEbookId(null);
                            setNewFreeEbook({ title: "", imageLink: "", downloadLink: "" });
                          }}
                          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="grid md:grid-cols-3 gap-4">
                    {freeEbooks.length === 0 ? (
                      <p className="text-gray-500 italic">No free ebooks yet.</p>
                    ) : (
                      freeEbooks.map((f) => (
                        <div key={f.id} className="border rounded p-3">
                          <img src={f.imageLink} alt={f.title} className="w-full h-40 object-cover rounded mb-2" />
                          <p className="font-semibold">{f.title}</p>
                          <a href={f.downloadLink} target="_blank" rel="noreferrer" className="text-green-600 text-sm">Download</a>
                          <div className="mt-2 flex gap-2">
                            <button onClick={() => handleEditFreeEbook(f)} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Edit</button>
                            <button onClick={() => handleDeleteFreeEbook(f.id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* PREMIUM EBOOKS */}
                <div>
                  <h4 className="font-semibold mb-2">Add / Edit Premium Ebook</h4>
                  <form onSubmit={editPremiumEbookId ? handleUpdatePremiumEbook : handleAddPremiumEbook} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={newPremiumEbook.title}
                      onChange={handlePremiumEbookChange}
                      className="border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      name="imageLink"
                      placeholder="Image URL"
                      value={newPremiumEbook.imageLink}
                      onChange={handlePremiumEbookChange}
                      className="border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="Price (₦)"
                      value={newPremiumEbook.price}
                      onChange={handlePremiumEbookChange}
                      className="border border-green-200 rounded-md px-3 py-2 outline-none"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                        {editPremiumEbookId ? (savingEbook ? "Updating..." : "Update Premium Ebook") : (savingEbook ? "Adding..." : "Add Premium Ebook")}
                      </button>
                      {editPremiumEbookId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditPremiumEbookId(null);
                            setNewPremiumEbook({ title: "", imageLink: "", price: "" });
                          }}
                          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="grid md:grid-cols-3 gap-4">
                    {premiumEbooks.length === 0 ? (
                      <p className="text-gray-500 italic">No premium ebooks yet.</p>
                    ) : (
                      premiumEbooks.map((p) => (
                        <div key={p.id} className="border rounded p-3">
                          <img src={p.imageLink} alt={p.title} className="w-full h-40 object-cover rounded mb-2" />
                          <p className="font-semibold">{p.title}</p>
                          <p className="text-green-700 font-medium">{p.price}</p>
                          <div className="mt-2 flex gap-2">
                            <button onClick={() => handleEditPremiumEbook(p)} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Edit</button>
                            <button onClick={() => handleDeletePremiumEbook(p.id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CONTACT MESSAGES */}
        <div className="mb-8">
          <button
            onClick={() => setShowContactSection(!showContactSection)}
            className="w-full flex justify-between items-center bg-green-700 text-white px-4 py-3 rounded-md text-base sm:text-lg"
          >
            <span className="font-semibold">Contact Messages</span>
            <span>{showContactSection ? "−" : "+"}</span>
          </button>

          {showContactSection && (
            <div className="mt-4 bg-white border border-green-100 rounded-lg shadow p-4 sm:p-6 overflow-x-auto">
              {contactMessages.length === 0 ? (
                <p className="text-gray-500 italic text-sm">No messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`border p-3 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start gap-3 ${msg.read ? "bg-gray-50" : "bg-green-50"}`}
                    >
                      <div className="break-words">
                        <p className="font-semibold text-green-800">{msg.fullName}</p>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                        <p className="text-sm text-gray-700 mt-2">{msg.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleString() : ""}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        {!msg.read && (
                          <button onClick={() => handleMarkAsRead(msg.id)} className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 w-full sm:w-auto">
                            Mark as Read
                          </button>
                        )}
                        <button onClick={() => handleDeleteMessage(msg.id)} className="px-3 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700 w-full sm:w-auto">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;