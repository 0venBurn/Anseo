import React from 'react';
import loading from '/img/loading.svg'; 
import Header from '../General/Header';

const LoadingPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="relative flex flex-col min-h-[calc(100vh-5rem)]
      bg-bk-grey flex-grow justify-between items-start p-4 md:p-16 overflow-hidden">
        <div className="flex flex-col justify-start gap-6">
          <h1 className="font-bold font-alegreya text-3xl md:text-7xl text-primary-text-dark max-w-6xl">
            Scouting the best locations...
          </h1>
          <p className="italic font-commissioner text-xl md:text-3xl text-shaded-grey">
            Navigating the Big Apple
          </p>
          <p className="italic font-commissioner md:text-2xl text-primary-text-dark max-w-xl">
            Just like a seasoned explorer, we're traversing the vast landscape of New York City to find the perfect spot for your business. Hang tight, we'll have some top-notch recommendations for you in just a moment!
          </p>
        </div>
          <img src={loading} alt="Loading" className="absolute bottom-8 md:bottom-12 right-4 md:right-12 block max-w-48 md:max-w-screen-sm h-auto" />
      </div>
    </>
  );
};

export default LoadingPage;
