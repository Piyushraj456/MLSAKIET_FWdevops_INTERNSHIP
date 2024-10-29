import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const newsletterRef = useRef(null);
  const titleRef = useRef([]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setMessage(`Hey there! 🎉 Welcome to the Dexter Blog family! We're thrilled to have you on board! 🚀 Get ready for your dose of tech trends, insights, and all things cool delivered straight to your inbox. Stay curious, stay ahead, and enjoy the journey with Team Piyush Raj! 😄📬`);
    setEmail(''); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = newsletterRef.current;
      const { top, bottom } = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

     
      if (top < windowHeight && bottom > 0) {
        
        titleRef.current.forEach((word, index) => {
          gsap.fromTo(
            word,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.2 + 1, 
            }
          );
        });

        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const titleWords = "Sign up for free weekly newsletter".split(" ");

  return (
    <section ref={newsletterRef} className="py-12 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 xl:w-7/12 px-4 mb-20 lg:mb-0">
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="max-w-sm xl:max-w-md mb-12">
                <div className="flex flex-wrap justify-center">
                  {titleWords.map((word, index) => (
                    <h1
                      key={index}
                      ref={(el) => (titleRef.current[index] = el)} 
                      className="font-heading text-6xl xs:text-8xl sm:text-8xl xl:text-10xl text-[#ccff00] tracking-tighter"
                    >
                      {word}
                    </h1>
                  ))}
                </div>
              </div>
              <div>
                <div className="sm:flex lg:max-w-md xl:max-w-xl">
                  <div className="w-full mb-3 sm:mb-0 mr-4">
                    <input
                      className="w-full h-15 py-4 px-8 text-coolGray-500 placeholder-coolGray-600 bg-black text-white border-1.5 border-coolGray-700 rounded-full"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full sm:w-auto sm:flex-shrink-0">
                    <button
                      className="inline-block w-full sm:w-auto h-15 py-4 px-8 text-center font-medium text-black hover:text-white leading-none bg-white hover:bg-blue-500 rounded-full transition duration-150"
                      type="submit"
                      onClick={handleSubscribe}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                {message && (
                  <div className="mt-4 text-white animate-bounceSlow">
                    <p>{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
            <div className="max-w-xl lg:max-w-none mx-auto">
              <div className="flex flex-wrap -mx-4 h-full">
                <div className="w-full sm:w-1/2 px-4 mb-20 sm:mb-0">
                  <div className="py-16 px-10 md:px-8 text-center bg-coolGray-900 rounded-4xl animate-bounceSlow">
                    <div className="max-w-52 mx-auto p-4 rounded-3xl shadow-xl" style={{ backgroundImage: 'linear-gradient(to top, #aeff43 0%, #56f1a4 100%)' }}>
                      <h4 className="text-4xl text-white tracking-tight mb-4 font-bold">10 000+</h4>
                      <p className="text-white font-medium">Sharing Top tech insights and trends with over 10,000 readers and growing every day.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 px-4">
                  <div className="py-32 px-10 md:px-8 text-center bg-coolGray-900 rounded-4xl">
                    <div className="flex flex-col h-full justify-center max-w-2xs mx-auto shadow-xl bg-[#ccff00] p-4 rounded-3xl">
                      <h4 className="text-4xl tracking-tight mb-4 font-bold">12 000+</h4>
                      <p className="font-medium">Proudly empowering over 12,000 users with tech solutions that meet top industry standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
