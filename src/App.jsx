import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import ProgrammersList from "./components/programmersList";
import ContestHistory from "./components/contestHistory";
import PhotoGallery from "./components/photoGallery";
import About from "./components/about";
import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signUpForm";
import NotFound from "./components/notFound";
import Home from "./components/home";
import Notices from "./components/notices";
import NoticeForm from "./components/noticeForm";
import TestCC from "./components/testCC";
import Logout from "./components/logout";
import Profiles from "./components/profiles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authService";
import ContestForm from "./components/contestForm";
import ProfileForm from "./components/profileForm";
import AboutEditForm from "./components/aboutEditForm";
import Resources from "./components/resources";
import ResourcePosts from "./components/resourcePosts";
import ResourceFiles from "./components/resourceFiles";
import ResourcePostsForm from "./components/resourcePostsForm";
import ResourcePost from "./components/resourcePost";
import Rating from "./components/rating";
import RatingForm from "./components/RatingForm";
import Admins from "./components/admins";
import ResetPassword from "./components/resetPassword";
import NewPassword from "./components/newPassword";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar user={auth.getCurrentUser()} />
      <main className="container">
        <Routes>
          <Route path="/programmersList" element={<ProgrammersList />} />
          <Route path="/contestHistory" element={<ContestHistory />} />
          <Route path="/contestHIstory/contestForm" element={<ContestForm />} />
          <Route path="/photoGallery" element={<PhotoGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/edit" element={<AboutEditForm />} />
          <Route path="/signIn" element={<SignInForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/users/verify/:id" element={<NewPassword />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/resources" element={<Resources />}>
            <Route path="posts" element={<ResourcePosts />} />
            <Route path="files" element={<ResourceFiles />} />
            <Route path="" element={<Navigate to="posts" />} />
          </Route>
          <Route path="/resources/new" element={<ResourcePostsForm />} />
          <Route path="/resources/edit" element={<ResourcePostsForm />} />
          <Route path="/resources/posts/:id" element={<ResourcePost />} />
          <Route path="/notices/noticeForm" element={<NoticeForm />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/rating/newRating" element={<RatingForm />} />
          <Route path="/profiles/:id" element={<Profiles />} />
          <Route path="/profiles/profileForm" element={<ProfileForm />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/test" element={<TestCC />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
