import React from 'react';

const Footer = ({scrollToBlog}) => {
  return (
    <section className="py-24 bg-slate-950 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="max-w-lg mx-auto">
              <a className="inline-block mb-6" href="#">
                <h1 className='text-[#ccff00] text-3xl font-bold'>Dexter</h1>
              </a>
              <p className="max-w-sm text-gray-400">
              Dexter is your go-to source for tech trends, insights, and innovation, keeping you informed and inspired in the digital age.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="max-w-lg xl:max-w-xl mx-auto xl:mr-0">
              <div className="mb-6 pb-6 border-b border-blueGray-800">
                <div className="-mb-4">
                  <a className="inline-flex mb-4 mr-10 items-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-green-300 to-blue-500 hover:from-yellow-500 hover:via-yellow-300 hover:to-blue-500" href="mailto:support@vendia.co">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 3.66675L8.0755 8.05041C8.63533 8.42364 9.36467 8.42364 9.9245 8.05041L16.5 3.66675M3.16667 12.8334H14.8333C15.7538 12.8334 16.5 12.0872 16.5 11.1667V2.83341C16.5 1.91294 15.7538 1.16675 14.8333 1.16675H3.16667C2.24619 1.16675 1.5 1.91294 1.5 2.83341V11.1667C1.5 12.0872 2.24619 12.8334 3.16667 12.8334Z" stroke="#84878A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="ml-2">support@dexter.co</span>
                  </a>
                  <a className="inline-flex mb-4 items-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-green-300 to-blue-500 hover:from-yellow-500 hover:via-yellow-300 hover:to-blue-500" href="tel:(405) 555-0128">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 3.16667C1.5 2.24619 2.24619 1.5 3.16667 1.5H5.89937C6.25806 1.5 6.57651 1.72953 6.68994 2.06981L7.93811 5.81434C8.06926 6.20777 7.89115 6.63776 7.52022 6.82322L5.63917 7.76375C6.55771 9.80101 8.19898 11.4423 10.2363 12.3608L11.1768 10.4798C11.3622 10.1088 11.7922 9.93074 12.1857 10.0619L15.9302 11.3101C16.2705 11.4235 16.5 11.7419 16.5 12.1006V14.8333C16.5 15.7538 15.7538 16.5 14.8333 16.5H14C7.09644 16.5 1.5 10.9036 1.5 4V3.16667Z" stroke="#84878A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="ml-2">(+91) 6204xxxx32</span>
                  </a>
                </div>
              </div>
              <div className="flex -mb-2 flex-wrap items-center">
                <a className="inline-block mb-2 mr-8 xl:mr-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 hover:from-yellow-500 hover:via-green-300 hover:to-blue-500" href="#">Company</a>
                <a className="inline-block mb-2 mr-8 xl:mr-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 hover:from-yellow-500 hover:via-green-300 hover:to-blue-500" href="/allblogs">Blogs</a>
                <a className="inline-block mb-2 mr-8 xl:mr-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 hover:from-yellow-500 hover:via-green-300 hover:to-blue-500" onClick={scrollToBlog}>Latest</a>
                <a className="inline-block mb-2 mr-8 xl:mr-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 hover:from-yellow-500 hover:via-green-300 hover:to-blue-500" href="/aboutus">About</a>
                <a className="inline-block mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 hover:from-yellow-500 hover:via-green-300 hover:to-blue-500" href="#">Privacy Policy</a>
              </div>
             
            </div>
          </div>
      
        </div>
      </div>
      <p className="text-slate-700 text-center">
  Copyright ©  {new Date().getFullYear()} Dexter Inc. All rights reserved
</p>

    </section>
  );
};

export default Footer;
