// Contact.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InstagramLogo from '../assets/instagram.svg';
import LinkedInLogo from '../assets/linkedin.svg';
import DiscordLogo from '../assets/discord.svg';
import MailLogo from '../assets/mail.png';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // State for additional user info
  const [visitorIP, setVisitorIP] = useState('Unknown');
  const [userId, setUserId] = useState('');

  // Success message to appear when the message is sent
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    // Fetch visitor IP
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setVisitorIP(data.ip))
      .catch((error) => {
        console.error('Error fetching IP:', error);
        setVisitorIP('Unknown');
      });

    // Generate or retrieve userId from cookies
    let existingUserId = getCookie('userId');
    if (!existingUserId) {
      existingUserId = Date.now().toString(); 
      setCookie('userId', existingUserId, 365);
    }
    setUserId(existingUserId);
  }, []);

    // UseEffect to make the success message disappear after 5 seconds
    useEffect(() => {
      let timer;
      if (successMessage) {
        // Set a timer to clear the success message after 5 seconds
        timer = setTimeout(() => setSuccessMessage(''), 5000);
      }
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }, [successMessage]);

  // Function to send data to Discord webhook
  const PostToDiscord = (data) => {
    const { name, email, message } = data;

    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const operatingSystem = getOperatingSystem(userAgent);
    const gpu = getGPU();
    const dateTime = new Date().toLocaleString();
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const deviceName = getDeviceName(userAgent);
    const browser = getBrowser(userAgent);

    const webhookBody = {
      content: 'Form information',
      embeds: [
        {
          title: 'Form Submission',
          fields: [
            { name: 'Name', value: name },
            { name: 'Email', value: email },
            { name: 'Message', value: message },
            { name: 'IP Address', value: visitorIP },
            { name: 'User Agent', value: userAgent },
            { name: 'Language', value: language },
            { name: 'Browser', value: browser },
            { name: 'Operating System', value: operatingSystem },
            { name: 'GPU', value: gpu },
            { name: 'Date and Time', value: dateTime },
            { name: 'Screen Resolution', value: screenResolution },
            { name: 'Device Model', value: deviceName },
            { name: 'Cookie ID', value: userId },
          ],
        },
      ],
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1285361781908181054/lXcgt0PzWbRHG4bNjyN3Ry8iXxMj9rXhtAXU1m8n8romdJ9UewBVvA7-XGBjTJnWZJmv'; // Replace with your actual webhook URL

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    })
    .then((response) => {
      if (response.ok) {
        setSuccessMessage('Message sent successfully!');
        reset();
      } else {
        toast.error('An error occurred while sending the message.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('An unknown error occurred on the server.');
    });
  };

  // Utility functions
  const getBrowser = (userAgent) => {
    if (userAgent.includes('Firefox')) {
      return 'Mozilla Firefox';
    } else if (userAgent.includes('Chrome')) {
      return 'Google Chrome';
    } else if (userAgent.includes('Safari')) {
      return 'Apple Safari';
    } else if (userAgent.includes('Edge')) {
      return 'Microsoft Edge';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      return 'Opera';
    } else {
      return 'Unknown';
    }
  };

  const getOperatingSystem = (userAgent) => {
    const operatingSystems = [
      { name: 'Windows', searchString: 'Win' },
      { name: 'Mac', searchString: 'Mac' },
      { name: 'Linux', searchString: 'Linux' },
      { name: 'iOS', searchString: 'iPhone|iPad|iPod' },
      { name: 'Android', searchString: 'Android' },
    ];

    for (const os of operatingSystems) {
      if (new RegExp(os.searchString, 'i').test(userAgent)) {
        return os.name;
      }
    }

    return 'Unknown';
  };

  const getDeviceName = (userAgent) => {
    const deviceKeywords = [
      { keyword: 'SM-G532M', name: 'Samsung Galaxy J2 Prime' },
      // Add more devices as needed
    ];

    for (const device of deviceKeywords) {
      if (userAgent.includes(device.keyword)) {
        return device.name;
      }
    }

    return 'Not registered in the database';
  };

  const getGPU = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const extension = gl.getExtension('WEBGL_debug_renderer_info');
      if (extension) {
        return gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) || 'Unknown';
      }
      return 'Unknown';
    } catch (e) {
      return 'Unknown';
    }
  };

  // Cookie utility functions
  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  const getCookie = (name) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  return (
    <div id="contact" className="p-4 md:pt-8">
      <ToastContainer /> {/* Toast container to display messages */}
      <ScrollReveal>
        <h1 className="sm:mt-10 lg:mt-20 text-4xl sm:text-6xl md:text-6xl mb-10 text-center font-potta-one font-normal leading-none text-[#f9f5e3]">
          Contact Us
        </h1>
      </ScrollReveal>

      <ScrollReveal>
        <div className="flex flex-wrap items-center">
          <div className="bg-gray-800 bg-opacity-60 mx-auto p-8 rounded-lg shadow-lg w-full max-w-lg">
            {successMessage && (
              <div className="mb-4 p-4 text-green-800 bg-green-200 rounded">
                {successMessage}
              </div>
            )}
            <form className="flex flex-col" onSubmit={handleSubmit(PostToDiscord)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-md font-medium text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-md font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-md font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  {...register('message', { required: 'Message is required' })}
                  className={`w-full px-3 py-2 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#36382E] text-[#F9F5E3] font-space-mono font-semibold rounded-lg transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-101 hover:bg-indigo-500 duration-100"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          <ScrollReveal>
            <div className="bg-opacity-70 mx-auto p-8 rounded-lg w-full max-w-lg flex flex-col items-center">
              <a href="mailto:tcscatrent@outlook.com">
                <div className="flex items-center justify-center gap-3 hover:scale-105">
                  <img src={MailLogo} className="h-12" alt="Mail Logo" />
                  <p className="w-full text-xl font-space-mono text-[#f9f5e3] font-normal leading-loose rounded-xl">
                    tcscatrent@outlook.com
                  </p>
                </div>
              </a>
              <p className="w-full text-3xl font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 rounded-xl">
                Follow and Explore More!
              </p>
              <div className="flex items-center justify-around gap-3">
                <a
                  href="https://www.instagram.com/hacktrentu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={InstagramLogo} className="h-16 hover:scale-110" alt="Instagram Logo" />
                </a>
                <a
                  href="https://www.linkedin.com/company/hack-trent/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={LinkedInLogo} className="h-16 hover:scale-110" alt="LinkedIn Logo" />
                </a>
                <a
                  href="https://discord.gg/sJTtfwVvFh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={DiscordLogo} className="h-16 hover:scale-110" alt="Discord Logo" />
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
