import React, { useState, useRef } from 'react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tabIndex) => {
    setActiveTab(activeTab === tabIndex ? 0 : tabIndex);
  };

  return (
    <div id="faq" className="max-w-5xl px-2 py-3 mx-auto mt-32 tracking-wide md:px-4 md:pt-8 md:mt-44">
      {/* Title */}
      <div className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-6xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]">Frequently Asked Questions</div>
      
      {/* Accordion */}
      <div className="grid gap-3 py-8 text-lg leading-6 md:gap-20 md:grid-cols-2 text-white">
        {/* First Column */}
        <div className="space-y-5 text-gray-900 text-lg font-poppins ">
          <AccordionItem
            index={1}
            title="What is a hackathon?"
            content="A hackathon is best described as an “invention marathon”. Anyone who has an interest in technology attends a hackathon to learn, build & share their creations over the course of a weekend in a relaxed and welcoming atmosphere. You don’t have to be a programmer and you certainly don’t have to be majoring in Computer Science."
            className="text-gray-900"
            activeTab={activeTab}
            toggleTab={toggleTab}
          />
          <AccordionItem
            index={2}
            title="Does HackTrent help with travel reimbursements?"
            content="Unfortunately, HackTrent isn’t able to provide hackers with travel reimbursements. We have in certain cases provided it in the past but we’re always on the hunt to find more sustainable ways to bring more students to hackathons."
            activeTab={activeTab}
            toggleTab={toggleTab}
          />
        </div>

        {/* Second Column */}
        <div className="space-y-5 text-gray-900 text-lg font-poppins ">
          <AccordionItem
            index={3}
            title="I just graduated, can I still come to an event?"
            content="Yes. Anyone who has graduated within the last 12 months is still eligible to attend an HackTrent. After that, there’s plenty of non-student hackathons that exist for you to consider attending."
            activeTab={activeTab}
            toggleTab={toggleTab}
          />
          <AccordionItem
            index={4}
            title="What if I don’t know how to code?"
            content="Not a problem! The entire Major League Hacking team knew very little when they each attended their very first hackathon. It’s entirely irrelevant what your experience is going into a hackathon, it’s more about your interest in technology. Every HackTrent Member Event is passionate about making their hackathons very welcoming and beginner-friendly. If you’re wanting to learn how to code outside of a hackathon, there’s a fantastic blog post that you should read. After, you should check out the following: Treehouse, Codecademy and the Major League Hacking blog to get started."
            activeTab={activeTab}
            toggleTab={toggleTab}
          />
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({ index, title, content, activeTab, toggleTab }) => {
  const contentRef = useRef(null);

  const handleMouseLeave = () => {
    if (activeTab === index) {
      toggleTab(0); // Shrink back to normal when mouse leaves the item
    }
  };

  return (
    <div
      className="relative transition-all duration-700 border rounded-xl hover:shadow-2xl bg-[#F9F5E3] transform hover:-translate-y-2 hover:scale-105 ease-out" 
      onMouseEnter={() => toggleTab(index)} // Automatically expand on hover
      onMouseLeave={handleMouseLeave} // Shrink when cursor leaves
    >
      <div
        onClick={() => toggleTab(index)}
        className="w-full p-4 text-left cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="tracking-wide">{title}</span>
          <span
            className={`transition-transform duration-500 transform fill-current ${activeTab === index ? '-rotate-180' : ''
              }`}
          >
            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </div>
      </div>

      <div
        ref={contentRef}
        style={{ maxHeight: activeTab === index ? contentRef.current.scrollHeight : 0 }}
        className="relative overflow-hidden transition-all duration-700"
      >
        <div className="px-6 pb-4 text-gray-900">{content}</div>
      </div>
    </div>
  );
};

export default FAQ;
