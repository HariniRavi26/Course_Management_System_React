import { Routes, Route } from "react-router-dom";
import AddCourse from "./pages/AddCourse";
import AdminDashboard from "./pages/AdminDashboard";
import BrowseCourses from "./pages/BrowseCourses";
import Certificate from "./pages/Certificate";
import CourseContent from "./pages/CourseContent";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import EditCourse from "./pages/EditCourse";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Materials from "./pages/Materials";
import Module from "./pages/Module";
import MyCourses from "./pages/MyCourses";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import StudentDashboard from "./pages/StudentDashboard";
import VideoPlayer from "./pages/VideoPlayer";

export default function App() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/browse-courses" element={<BrowseCourses />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course-content" element={<CourseContent />} />
        <Route path="/module" element={<Module />} />
        <Route path="/video-player" element={<VideoPlayer />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course" element={<EditCourse />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/login.html" element={<Login />} />
        <Route path="/register.html" element={<Register />} />
        <Route path="/forgot-password.html" element={<ForgotPassword />} />
        <Route path="/reset-password.html" element={<ResetPassword />} />
        <Route path="/student-dashboard.html" element={<StudentDashboard />} />
        <Route path="/admin-dashboard.html" element={<AdminDashboard />} />
        <Route path="/browse-courses.html" element={<BrowseCourses />} />
        <Route path="/courses.html" element={<Courses />} />
        <Route path="/course-details.html" element={<CourseDetails />} />
        <Route path="/my-courses.html" element={<MyCourses />} />
        <Route path="/course-content.html" element={<CourseContent />} />
        <Route path="/module.html" element={<Module />} />
        <Route path="/video-player.html" element={<VideoPlayer />} />
        <Route path="/materials.html" element={<Materials />} />
        <Route path="/progress.html" element={<Progress />} />
        <Route path="/certificate.html" element={<Certificate />} />
        <Route path="/enrollment-success.html" element={<EnrollmentSuccess />} />
        <Route path="/notifications.html" element={<Notifications />} />
        <Route path="/profile.html" element={<Profile />} />
        <Route path="/add-course.html" element={<AddCourse />} />
        <Route path="/edit-course.html" element={<EditCourse />} />
    </Routes>;
}
