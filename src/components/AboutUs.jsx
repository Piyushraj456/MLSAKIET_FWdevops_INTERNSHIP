import React from 'react';
import logo from "../assets/about1.png"
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <section className="py-12 lg:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex mb-4 items-center">
          <svg width="8" height="8" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="#5bfc16"></circle>
          </svg>
          <span className="inline-block ml-2 text-4xl font-medium text-white">About us</span>
        </div>
        <div className="border-t border-white border-opacity-20 pt-16">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                <div className="max-w-xl">
                  <h1 className='font-bold text-4xl text-[#ccff00]'>Dexter</h1>
                  <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
                  Stay Ahead in the Tech World
                  </h1>
                  <p className="text-lg text-white opacity-80 mb-10">
                    
Our blog explores the fast-paced world of technology, from the latest tools and trends to the breakthroughs shaping tomorrow. We aim to simplify complex topics, offering clear insights and updates for anyone curious about how tech is transforming everyday life. Stay connected as we dive into the innovations redefining the way we live, work, and interact.
                  </p>
                  <ul className="text-white">
                    <li className="flex items-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="10" fill="#48ff00"></rect>
                        <path d="M14.8 6.40002L8.19995 13L5.19995 10" stroke="#1D1F1E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="ml-3 text-lg">Timely Updates</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="10" fill="#48ff00"></rect>
                        <path d="M14.8 6.40002L8.19995 13L5.19995 10" stroke="#1D1F1E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="ml-3 text-lg">Simplified Tech Insights:</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="10" fill="#48ff00"></rect>
                        <path d="M14.8 6.40002L8.19995 13L5.19995 10" stroke="#1D1F1E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="ml-3 text-lg">Expert Analysis:</span>
                    </li>
                    <li className="flex items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="10" fill="#48ff00"></rect>
                        <path d="M14.8 6.40002L8.19995 13L5.19995 10" stroke="#1D1F1E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="ml-3 text-lg">Community-Driven Content</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="lg:max-w-md lg:ml-auto">
                  <img className="block w-full h-full rounded-3xl shadow-2xl" src={logo} alt="Company image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
