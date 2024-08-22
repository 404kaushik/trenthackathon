import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Home from "./pages/Home";
import About from "./pages/About"; // Adjusted to match the naming convention
import Contact from "./pages/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AccountCreated from "./pages/AccountCreated";


function App() {
  const user = localStorage.getItem("token");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={user ? <Main /> : <Home />} /> {/* Default route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
        <Route path="/account-created" element={<AccountCreated />} /> {/* New route for account creation success */}
        <Route path="*" element={<Navigate replace to={user ? "/" : "/login"} />} /> {/* Catch-all route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
