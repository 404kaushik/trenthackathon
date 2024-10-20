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
      const headerHeight = document.querySelector('nav').offsetHeight; // Get the header's height dynamically
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; // Calculate the element's position relative to the document
  
      window.scrollTo({
        top: elementPosition - headerHeight, // Scroll to the element minus the header's height
        behavior: 'smooth', // Smooth scroll behavior
      });
    }
  };
  

  return (
    <nav className="bg-[#1C1D21] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600">
      <ScrollReveal>
        <div className="w-screen flex items-center justify-between mx-auto p-6 box-border">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse hover:scale-105">
            <svg width="75" height="70" viewBox="0 0 317 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M158.5 319C245.485 319 316 247.813 316 160C316 72.1867 245.485 1 158.5 1C71.5152 1 1 72.1867 1 160C1 247.813 71.5152 319 158.5 319Z" fill="#F9F5E3" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
              <path d="M159.821 263.733C164.77 261.988 169.659 259.685 173.475 255.958C178.572 250.971 181.325 243.754 181.991 236.486C182.666 229.228 181.394 221.897 179.407 214.907C175.462 201.052 167.84 187.32 155.28 181.259C139.172 173.485 119.796 180.309 102.734 175.188C89.319 171.162 78.7263 160.042 71.6611 147.466C78.1102 147.91 85.2548 145.453 90.6406 141.261C96.0264 137.07 100.061 131.298 104.304 125.857C111.598 116.503 119.726 107.871 128.55 100.097C139.649 90.3091 153.174 81.5228 169.768 83.1644C168.228 78.415 168.993 73.2217 169.977 68.3175C171.02 63.1035 172.302 57.9102 174.359 53.037C179.228 41.5043 188.569 32.1295 199.231 27.5557C206.127 38.5824 211.295 50.7862 214.474 63.5268C217.108 74.0993 218.27 85.7868 214.117 95.2752C225.653 100.582 231.546 113.88 235.63 126.342C241.284 143.605 245.418 161.694 244.782 179.927C244.544 186.721 243.629 193.546 241.453 199.957C239.635 205.285 236.972 210.24 234.328 215.165C231.775 219.915 229.211 224.685 226.12 229.083C221.748 235.319 216.392 240.729 210.798 245.778C203.474 252.376 195.574 258.477 186.601 262.246C177.628 266.004 167.433 267.274 158.241 264.146C166.42 261.771 173.743 256.299 178.433 248.906C178.503 248.906 178.562 248.906 178.831 248.906" fill="#F9F5E3"/>
              <path d="M159.821 263.733C164.77 261.988 169.659 259.685 173.475 255.958C178.572 250.971 181.325 243.754 181.991 236.486C182.666 229.228 181.394 221.897 179.407 214.907C175.462 201.052 167.84 187.32 155.28 181.259C139.172 173.485 119.796 180.309 102.734 175.188C89.319 171.162 78.7263 160.042 71.6611 147.466C78.1102 147.91 85.2548 145.453 90.6406 141.261C96.0264 137.07 100.061 131.298 104.304 125.857C111.598 116.503 119.726 107.871 128.55 100.097C139.649 90.3091 153.174 81.5228 169.768 83.1644C168.228 78.415 168.993 73.2217 169.977 68.3175C171.02 63.1035 172.302 57.9102 174.359 53.037C179.228 41.5043 188.569 32.1295 199.231 27.5557C206.127 38.5824 211.295 50.7862 214.474 63.5268C217.108 74.0993 218.27 85.7868 214.117 95.2752C225.653 100.582 231.546 113.88 235.63 126.342C241.284 143.605 245.418 161.694 244.782 179.927C244.543 186.721 243.629 193.546 241.453 199.957C239.635 205.285 236.972 210.24 234.328 215.165C231.775 219.915 229.211 224.685 226.12 229.083C221.748 235.319 216.392 240.729 210.798 245.778C203.474 252.376 195.574 258.477 186.601 262.246C177.628 266.004 167.433 267.274 158.241 264.146C166.42 261.771 173.743 256.299 178.433 248.906C178.503 248.906 178.562 248.906 178.831 248.906" stroke="black" stroke-width="5" stroke-miterlimit="10"/>
              <path d="M132.466 178.214C132.605 189.664 129.922 200.918 127.259 212.028C126.136 216.705 124.983 221.475 122.529 225.563C120.87 228.341 118.674 230.715 116.497 233.059C108.23 241.98 99.9623 250.91 91.6948 259.831C111.598 263.166 131.89 264.002 151.992 262.319C155.987 261.989 160.041 261.535 163.777 260.006C173.297 256.104 179.199 245.542 180.272 234.969C181.346 224.397 178.345 213.814 174.39 204.005C173.177 201.011 171.866 198.038 170.177 195.302C162.297 182.602 146.795 176.676 132.267 177.337C132.595 181.074 132.386 184.863 132.466 178.214Z" fill="#FF7400" stroke="black" stroke-width="4" stroke-miterlimit="10"/>
              <path d="M147.114 85.9106C146.17 77.847 146.229 69.6389 147.541 61.6373C147.968 59.0664 148.515 56.5162 149.29 54.0486C150.194 51.1681 151.387 48.401 152.659 45.696C155.65 39.3257 159.177 33.0896 164.235 28.4848C164.414 28.3196 164.643 28.144 164.712 28.3918C165.755 28.0408 166.928 28.5364 167.723 29.3417C168.518 30.147 169.015 31.2001 169.512 32.2223C171.052 35.392 172.771 38.479 174.649 41.4422C175.484 42.7638 176.378 44.0853 177.62 44.9939" fill="#FF7400"/>
              <path d="M147.114 85.9106C146.17 77.847 146.229 69.6389 147.541 61.6373C147.968 59.0664 148.515 56.5162 149.29 54.0486C150.194 51.1681 151.387 48.401 152.659 45.696C155.65 39.3257 159.177 33.0896 164.235 28.4848C164.414 28.3196 164.643 28.144 164.712 28.3918C165.755 28.0408 166.928 28.5364 167.723 29.3417C168.518 30.147 169.015 31.2001 169.512 32.2223C171.052 35.392 172.771 38.479 174.649 41.4422C175.484 42.7638 176.378 44.0853 177.62 44.9939" stroke="black" stroke-width="4" stroke-miterlimit="10"/>
              <path d="M148.473 84.8051C145.651 69.0703 149.119 52.2824 157.575 38.9429C158.976 36.7231 160.517 34.5963 162.176 32.5829C162.902 31.7053 163.647 30.8381 164.551 30.1566C164.879 29.9088 165.316 29.6817 165.664 29.8882C165.823 29.9811 165.932 30.1463 166.032 30.3012C169.202 35.3086 172.381 40.3058 175.551 45.3132C175.76 45.6436 175.979 45.9947 176.008 46.387C176.038 46.7794 175.869 47.151 175.7 47.5021C174.806 49.3812 173.693 51.1364 172.829 53.0361C171.219 56.5362 170.454 60.3976 169.698 64.2074C168.725 69.1529 167.741 74.1914 168.168 79.2298C168.258 80.252 168.307 81.5012 167.492 82.0691C167.135 82.3169 166.688 82.3685 166.26 82.4201C160.248 83.0603 154.247 83.8862 148.274 84.8981C148.165 83.5971 148.056 82.3066 147.946 81.0057" fill="#FF7400"/>
              <path d="M148.473 84.8051C145.651 69.0703 149.119 52.2824 157.575 38.9429C158.976 36.7231 160.517 34.5963 162.176 32.5829C162.902 31.7053 163.647 30.8381 164.551 30.1566C164.879 29.9088 165.316 29.6817 165.664 29.8882C165.823 29.9811 165.932 30.1463 166.032 30.3012C169.202 35.3086 172.381 40.3058 175.551 45.3132C175.76 45.6436 175.979 45.9947 176.008 46.387C176.038 46.7794 175.869 47.151 175.7 47.5021C174.806 49.3812 173.693 51.1364 172.829 53.0361C171.219 56.5362 170.454 60.3976 169.698 64.2074C168.725 69.1529 167.741 74.1914 168.168 79.2298C168.258 80.252 168.307 81.5012 167.492 82.0691C167.135 82.3169 166.688 82.3685 166.26 82.4201C160.248 83.0603 154.247 83.8862 148.274 84.8981C148.165 83.5971 148.056 82.3066 147.946 81.0057" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
              <path d="M74.0874 147.797C89.4101 161.725 111.122 164.688 131.433 164.729C151.734 164.771 172.493 162.551 191.999 168.436C199.511 170.707 206.984 174.372 211.823 180.794C214.854 184.821 216.682 189.705 217.874 194.681C222.127 212.481 218.143 232.222 207.391 246.717C213.453 246.666 217.795 240.801 221.154 235.515C229.719 222.062 238.464 208.175 241.554 192.337C243.959 180.01 242.776 167.238 241.037 154.787C239.447 143.409 237.381 132.01 233.177 121.386C228.974 110.762 222.495 100.881 213.443 94.3459C218.381 71.3322 212.3 46.0368 197.544 28.2061C187.388 31.7887 179.846 41.1016 175.553 51.3643C171.26 61.627 169.79 72.8912 168.359 83.9903C161.353 81.4504 153.662 84.4755 147.114 88.1201C135.08 94.8105 124.189 103.731 115.097 114.335C108.877 121.582 103.461 129.646 96.4753 136.089C89.4797 142.531 80.3874 147.322 74.0874 147.797Z" fill="#FF7400" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
              <path d="M71.8398 147.663L79.2727 158.628L84.4796 145.464L71.8398 147.663Z" fill="black" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
              <path d="M195.394 39.7598C189.849 43.9826 182.058 55.8456 180.26 62.8045C179.147 67.1098 177.964 77.8062 177.626 80.9965C177.577 81.5024 177.915 81.967 178.402 82.0496L203.383 85.9214C203.78 85.9833 204.178 85.7665 204.347 85.3949C208.113 77.3829 206.841 74.079 204.615 67.4506C202.419 60.8118 195.662 41.3911 195.394 39.7598Z" fill="#F9F5E3" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
              <path d="M130.338 122.16L121.365 130.028C120.232 131.019 121.097 132.929 122.547 132.661L142.511 129.006C143.971 128.737 144.15 126.641 142.759 126.115L131.769 121.913C131.282 121.716 130.735 121.809 130.338 122.16Z" fill="#F9F5E3" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
            </svg>
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
