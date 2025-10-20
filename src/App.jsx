import React from "react";
import { Navbar, Hero, AboutUs, Programs, Departments, PastorSection, ContactUs } from "./components";
import "./App.css";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-16">
        <section id="home"><Hero /></section>
        <section id="about"><AboutUs /></section>
        <section id="programs"><Programs /></section>
        <section id="departments"><Departments /></section>
        <section id="pastorsection"><PastorSection /></section>
        <section id="contact"><ContactUs /></section>
      </main>
    </div>
  );
}

export default App;
