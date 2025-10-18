import React from "react";
import { Navbar, Hero, AboutUs } from "./components";
import "./App.css";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-16">
        <section id="home"><Hero /></section>
        <section id="about"><AboutUs /></section>
        {/* <section id="ministries"><Ministries /></section> */}
        {/* <section id="events"><Events /></section> */}
        {/* <section id="resources"><Resources /></section> */}
        {/* <section id="donation"><Donation /></section> */}
        {/* <section id="contact"><ContactUs /></section> */}
      </main>
    </div>
  );
}

export default App;
