import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import 'framer-motion';
import ApplicationForm from "./pages/ApplicationForm.jsx";
import ApplicationFrom2 from "./pages/ApplicationFrom2.jsx";
import ApplicationForm3 from "./pages/ApplicationForm3.jsx";
import ApplicationForm4 from "./pages/ApplicationForm4.jsx";
import ApplicationSuccess from "./pages/ApplicationSuccess.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import BackendPage from "./pages/BackendPage.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    window.gtag('config', 'G-X50BHTH4DP', {
      page_path: location.pathname,
    });
  }, [location]);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/application-success" element={<ApplicationSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/backend-test" element={<BackendPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/application" element={<PrivateRoute><ApplicationForm /></PrivateRoute>} />
          <Route path="/application-2" element={<PrivateRoute><ApplicationFrom2 /></PrivateRoute>} />
          <Route path="/application-3" element={<PrivateRoute><ApplicationForm3 /></PrivateRoute>} />
          <Route path="/application-4" element={<PrivateRoute><ApplicationForm4 /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;