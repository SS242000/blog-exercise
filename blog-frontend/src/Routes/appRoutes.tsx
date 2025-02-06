import { Route, Routes } from "react-router-dom";
import AppLogin from "../Login/login";
import LandingPage from "@/Pages/landingPage";
import BlogContent from "@/Pages/blogContent";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLogin />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/blogs" element={<BlogContent />} />
      </Routes>
    </>
  );
}
