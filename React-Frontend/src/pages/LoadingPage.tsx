import React from 'react';
import logo from '/img/loading.svg'; 
import Header from '../components/General/Header';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <Header />
      <div className="flex flex-grow justify-between items-start px-16 relative">
        <div className="flex flex-col justify-start " style={{ position: 'absolute', top: '50px', left: '50px' }}>
          <h1 className="font-bold" style={{ fontFamily: 'Alegreya', fontSize: '80px', lineHeight: '130.66px', color: '#3B447A', maxWidth: '1140px' }}>
            Scouting the best locations...
          </h1>
          <p className="italic" style={{ fontFamily: 'Commissioner', fontSize: '32px', lineHeight: '39.14px', color: '#ABB0B4', marginTop: '1rem' }}>
            Navigating the Big Apple
          </p>
          <p style={{ fontFamily: 'Commissioner', fontSize: '24px', lineHeight: '35px', color: '#3B447A', marginTop: '2rem', maxWidth: '551px' }}>
            Just like a seasoned explorer, we're traversing the vast landscape of New York City to find the perfect spot for your business. Hang tight, we'll have some top-notch recommendations for you in just a moment!
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: '50px', right: '50px' }}>
          <img src={logo} alt="Loading" style={{ width: '700px', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
