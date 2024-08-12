import React, { useEffect, useState } from 'react';
import logo from '../assets/logo2.png'

const navItems = [
  { label: 'About', href: '#apply' },
  { label: 'Applications', href: '#applications' },
  { label: 'Sponsors', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'The Team', href: '#' },
  { label: 'Contact Us', href: '#' }
]
const Header = () => {
  const [navIsHidden, setNavIsHidden] = useState(true);
  const toggleNav = () => {
    setNavIsHidden(!navIsHidden);
  };

  // minimize nav when window is smaller than 1024px
  const handleResize = () => {
    if (window.innerWidth < 1024) { 
      setNavIsHidden(true);
    } else {
      setNavIsHidden(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <nav class="bg-[#1C1D21] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b-2 border-gray-200 dark:border-gray-600">
      <div class="w-screen flex flex-wrap items-center justify-between mx-auto p-6 box-border">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} class="h-16 object-contain" alt="HackTrent Logo" />          
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">          
            <button onClick={toggleNav} data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
        <div className={`${navIsHidden ? 'hidden' : ''}  items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky" >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-[#1C1D21] md:space-x-8 p-0 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 font-varela">
            {
              navItems.map((item) => {
                return (
                  <li>
                    <a href={item.href} key={item.label} class="block py-2 px-3 text-[#F9F5E3] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">{item.label}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;