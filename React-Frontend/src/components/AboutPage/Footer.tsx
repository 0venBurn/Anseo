import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-200 py-4 mt-12">
        <div className="container mx-auto flex justify-between items-center px-10">
          <div className="flex space-x-4"></div>
        </div>
      </div>
      <div className="w-full bg-gray-100 py-4 text-center text-gray-600">
        © 2024, Anseo.
      </div>
    </>
  );
};

export default Footer;
