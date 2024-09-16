import React, { useRef } from 'react';
import InstagramLogo from '../assets/instagram.svg';
import LinkedInLogo from '../assets/linkedin.svg';
import DiscordLogo from '../assets/discord.svg';
import MailLogo from '../assets/mail.png';
import ScrollReveal from '../components/ScrollReveal';
const Contact = () => {

  return (
    <div id="contact" className="p-4 md:pt-8">
      <ScrollReveal>
        <h1 className='sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-6xl mb-10 text-center font-potta-one font-normal leading-none text-[#f9f5e3]'> 
          Contact Us </h1>
      </ScrollReveal>

      <ScrollReveal>
        <div class='flex flex-wrap items-center'>
          <div class="bg-gray-800 bg-opacity-60 mx-auto p-8 rounded-lg shadow-lg w-full max-w-lg ">
            <form method="post" className='flex flex-col'>
              <div class="mb-4">
                <label for="name" class="block text-md font-medium text-white mb-2">Name</label>
                <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
              <div class="mb-4">
                  <label for="email" class="block text-md font-medium text-white mb-2">Email</label>
                  <input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
              <div class="mb-4">
                  <label for="message" class="block text-md font-medium text-white mb-2">Message</label>
                  <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>
              <div>
                  <button type="submit" class="w-full py-2 px-4 bg-[#36382E] text-[#F9F5E3] font-space-mono font-semibold rounded-lg  transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-101 hover:bg-indigo-500 duration-100">
                    Send
                  </button>
              </div>
            </form>
          </div>
          <ScrollReveal>
            <div class="bg-opacity-70 mx-auto p-8 rounded-lg w-full max-w-lg flex flex-col items-center">
              <a href="tcscatrent@outlook.com">
                <div class='flex items-center justify-center gap-3 hover:scale-105'>
                  <img src={MailLogo} class='h-12'/>
                  <p className='w-[100%] text-xl font-space-mono text-[#f9f5e3] font-normal leading-loose rounded-xl'>
                    tcscatrent@outlook.com
                  </p>
                </div>
              </a>     
              <p className='w-[100%] text-3xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 rounded-xl'>
                Follow and Explore More!
              </p>
              <div class='flex items-center justify-around gap-3'>
                <a href='https://www.instagram.com/hacktrentu/' target="_blank">
                  <img src={InstagramLogo} class='h-16 hover:scale-110'/>
                </a>
                <a href=' https://www.linkedin.com/company/hack-trent/' target="_blank">
                  <img src={LinkedInLogo}  class='h-16 hover:scale-110'/>
                </a>
                <a href='https://discord.gg/sJTtfwVvFh' target="_blank">
                  <img src={DiscordLogo}  class='h-16 hover:scale-110'/>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Contact;
