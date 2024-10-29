
import React, { useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Blog from './Blog';
import Newsletter from './Newsletter';
import Footer from './Footer';

const Dashboard = () => {
  const blogRef = useRef(null);
  const newsletterRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-slate-950">
      <Navbar
        scrollToBlog={() => scrollToSection(blogRef)}
        scrollToNewsletter={() => scrollToSection(newsletterRef)}
      />
      <Hero />
      <div ref={blogRef}>
        <Blog />
      </div>
      <div ref={newsletterRef}>
        <Newsletter />
      </div>
      <Footer scrollToBlog={() => scrollToSection(blogRef)} />
    </div>
  );
};

export default Dashboard;
