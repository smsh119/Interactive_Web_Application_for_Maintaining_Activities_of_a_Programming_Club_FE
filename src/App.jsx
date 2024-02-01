import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./components/aboutPage/about";
import AboutEditForm from "./components/aboutPage/aboutEditForm";
import Admins from "./components/adminsPage/admins";
import Logout from "./components/authPages/logout";
import SignInForm from "./components/authPages/signInForm";
import SignUpForm from "./components/authPages/signUpForm";
import ContestForm from "./components/contestHistoryPage/contestForm";
import ContestHistory from "./components/contestHistoryPage/contestHistory";
import Home from "./components/homePage/home";
import Navbar from "./components/navbar";
import NewPassword from "./components/newPassword";
import NotFound from "./components/notFound";
import NoticeForm from "./components/noticePage/noticeForm";
import Notices from "./components/noticePage/notices";
import PhotoGallery from "./components/photoGalleryPage/photoGallery";
import ProfileForm from "./components/profilePage/profileForm";
import Profiles from "./components/profilePage/profiles";
import ProgrammersList from "./components/programmersListPage/programmersList";
import RatingForm from "./components/ratingPage/RatingForm";
import Rating from "./components/ratingPage/rating";
import ResetPassword from "./components/resetPassword";
import ResourceFiles from "./components/resourcesPage/resourceFiles";
import ResourcePost from "./components/resourcesPage/resourcePost";
import ResourcePosts from "./components/resourcesPage/resourcePosts";
import ResourcePostsForm from "./components/resourcesPage/resourcePostsForm";
import Resources from "./components/resourcesPage/resources";
import TestCC from "./components/testCC";
import auth from "./services/authService";

function App() {
    return (
        <>
            <ToastContainer />
            <Navbar user={auth.getCurrentUser()} />
            <main className="container">
                <Routes>
                    <Route
                        path="/programmersList"
                        element={<ProgrammersList />}
                    />
                    <Route
                        path="/contestHistory"
                        element={<ContestHistory />}
                    />
                    <Route
                        path="/contestHIstory/contestForm"
                        element={<ContestForm />}
                    />
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
                    <Route
                        path="/resources/new"
                        element={<ResourcePostsForm />}
                    />
                    <Route
                        path="/resources/edit"
                        element={<ResourcePostsForm />}
                    />
                    <Route
                        path="/resources/posts/:id"
                        element={<ResourcePost />}
                    />
                    <Route
                        path="/notices/noticeForm"
                        element={<NoticeForm />}
                    />
                    <Route path="/rating" element={<Rating />} />
                    <Route path="/rating/newRating" element={<RatingForm />} />
                    <Route path="/profiles/:id" element={<Profiles />} />
                    <Route
                        path="/profiles/profileForm"
                        element={<ProfileForm />}
                    />
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
