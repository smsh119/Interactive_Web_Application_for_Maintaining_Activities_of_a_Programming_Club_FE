import { Link, NavLink } from "react-router-dom";
import ICEPC_LOGO from "/ICEPC_LOGO.png";

function Navbar({ user }) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg clr4-bg">
            <div className="container-fluid">
                <Link className="navbar-brand clr1 fontLilitaOne" to="/">
                    <img src={ICEPC_LOGO} width="40rem" alt="" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link fontLilitaOne clr2"
                                to="/notices"
                            >
                                Notices
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link fontLilitaOne clr2"
                                to="/rating"
                            >
                                Rating
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className=" nav-link fontLilitaOne clr2"
                                to="/programmersList"
                            >
                                Programmer{`'`}s List
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link fontLilitaOne clr2"
                                to="/contestHistory"
                            >
                                Contest History
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link fontLilitaOne clr2"
                                to="/photoGallery"
                            >
                                Photo Gallery
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link fontLilitaOne clr2"
                                to="/resources"
                            >
                                Resources
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link fontLilitaOne clr2"
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                        {user && user.isSuperAdmin && (
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link fontLilitaOne"
                                    style={{ color: "red" }}
                                    to="/admins"
                                >
                                    Admins
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {!user && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link fontLilitaOne clr2"
                                        to="/signIn"
                                    >
                                        Sign in
                                    </NavLink>
                                </li>
                                {/* this is just for the horizontal line */}
                                <li className="nav-item">
                                    <NavLink className="nav-link fontLilitaOne clr2 signInVarticalLine">
                                        |
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link fontLilitaOne clr2"
                                        to="/signUp"
                                    >
                                        Sign up
                                    </NavLink>
                                </li>
                            </ul>
                        )}

                        {user && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a
                                        className="nav-link fontLilitaOne clr2"
                                        href={"/profiles/" + user.profileId}
                                    >
                                        {user.sid}
                                    </a>
                                </li>
                                {/* this is just for the horizontal line */}
                                <li className="nav-item">
                                    <NavLink className="nav-link fontLilitaOne clr2 signInVarticalLine">
                                        |
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link fontLilitaOne clr2"
                                        to="/logout"
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
