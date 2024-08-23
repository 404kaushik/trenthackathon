import React from 'react';

const Footer = () => {
  let date = new Date().toLocaleDateString();
  return (
    <footer className="bg-[#36382E] border-t-4 text-white p-4 mt-auto relative">
      <p className="text-center font-space-mono">&copy; TrentUniversityHackathon {date}</p>
    </footer>
  );
};

export default Footer;
