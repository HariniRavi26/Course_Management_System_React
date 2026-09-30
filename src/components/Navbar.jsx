import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar" id="navbar">
            <div className="brand"><NavLink to="/">📚 LMS Portal</NavLink></div>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/browse-courses">Courses</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Sign Up</NavLink>
            </div>
        </nav>
    );
}
