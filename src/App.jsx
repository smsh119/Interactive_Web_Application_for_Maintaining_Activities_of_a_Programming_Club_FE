import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ProgrammersList from "./components/programmersList";
import ContestHistory from "./components/contestHistory";
import PhotoGallery from "./components/photoGallery";
import About from "./components/about";
import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signUpForm";
import NotFound from "./components/notFound";
import Home from "./components/home";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/programmersList" element={<ProgrammersList />} />
          <Route path="/contestHistory" element={<ContestHistory />} />
          <Route path="/photoGallery" element={<PhotoGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/signIn" element={<SignInForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
