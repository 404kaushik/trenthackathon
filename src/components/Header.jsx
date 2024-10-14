import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import ScrollReveal from './ScrollReveal';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Apply', href: '#applications' },
  { label: 'Sponsors', href: '#sponsor' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Team', href: '#team' },
  { label: 'Contact Us', href: '#contact' },
];

const Header = () => {
  const [navIsHidden, setNavIsHidden] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setNavIsHidden(true);
      } else {
        setNavIsHidden(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNav = () => {
    setNavIsHidden(!navIsHidden);
  };

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      // Navigate to login
      navigate('/login');
    }
  };

  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#1C1D21] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600">
      <ScrollReveal>
        <div className="w-screen flex items-center justify-between mx-auto p-6 box-border">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-16 object-cover hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out" alt="HackTrent Logo" />
          </a>
          <div className="flex-grow flex items-center justify-center">
            <div
              className={`${navIsHidden ? 'hidden' : ''} items-center justify-between w-full md:flex md:w-auto`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-[#1C1D21] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 font-varela">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)} // Added scroll handler
                      className="block py-2 px-3 text-[#F9F5E3] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      aria-current="page"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}          
              </ul>
            </div>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Conditionally render the Dashboard button if the user is logged in */}
            {isLoggedIn && (
              <button
                onClick={() => navigate('/dashboard')}
                className="text-black font-semibold bg-[#f9f5e3] md:hover:bg-orange-400 md:hover:text-white hover:bg-blue-700 px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={handleAuthButtonClick}
              className="text-black font-semibold bg-[#f9f5e3] md:hover:bg-orange-400 md:hover:text-white hover:bg-blue-700 px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </nav>
  );
};

export default Header;
