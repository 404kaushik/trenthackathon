import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import ScrollReveal from './ScrollReveal';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Apply', href: '/#applications' },
  { label: 'Sponsors', href: '/#sponsor' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact Us', href: '/#contact' },
];

const Header = () => {
  const [navIsHidden, setNavIsHidden] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleResize = () => {
      setNavIsHidden(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    setNavIsHidden(!navIsHidden);
  };

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(href), 100);
    } else {
      scrollToSection(href);
    }
  };

  const scrollToSection = (href) => {
    const targetElement = document.querySelector(href.substring(1));
    if (targetElement) {
      const headerHeight = document.querySelector('nav').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="bg-[#1C1D21] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600">
      <ScrollReveal>
        <div className="w-screen flex items-center justify-between mx-auto p-6 box-border">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse hover:scale-105 bg-white rounded-full">
            <img src={logo} alt="logo" width="75" height="70"/>
          </Link>
          <div className="flex-grow flex items-center justify-center">
            <div className={`${navIsHidden ? 'hidden' : ''} items-center justify-between w-full md:flex md:w-auto`} id="navbar-sticky">
              <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-[#1C1D21] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 font-varela">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block py-2 px-3 text-[#F9F5E3] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}          
              </ul>
            </div>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
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