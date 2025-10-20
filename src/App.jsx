import React from "react";
import { Navbar, Hero, AboutUs, Programs, Departments, PastorSection, ContactUs } from "./components";
import "./App.css";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-16">
        <section id="home"><Hero /></section>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-200"></div>
        <section id="about"><AboutUs /></section>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-200"></div>
        <section id="programs"><Programs /></section>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-200"></div>
        <section id="departments"><Departments /></section>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-200"></div>
        <section id="pastorsection"><PastorSection /></section>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-200"></div>
        <section id="contact"><ContactUs /></section>
        {/* <section id="resources"><Resources /></section> */}
        {/* <section id="donation"><Donation /></section> */}
      </main>
    </div>
  );
}

export default App;
