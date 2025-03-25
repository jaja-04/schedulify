import { useState, useEffect } from "react";
import Logo from "../assets/logo-md.png";

const Loader = () => {
  const [visible, setVisible] = useState(false);
  const [bouncing, setBouncing] = useState(true);
  const [shiftLeft, setShiftLeft] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 700);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBouncing(false);
      setTimeout(() => {
        setShiftLeft(true);
        setTimeout(() => setShowText(true), 500);
      }, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bg-[#EDEFEF] w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center">
        <img
          className={`w-36 absolute transition-all duration-1000 ease-in-out transform ${
            bouncing
              ? "animate-bounce top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              : ""
          } ${shiftLeft ? "-translate-x-[72px]" : ""}`}
          src={Logo}
          alt="logo-md"
        />

        <div
          className={`flex flex-col justify-center ml-4 transition-all duration-1000 ease-in-out ${
            showText ? "opacity-100 translate-x-[60px]" : "opacity-0 translate-x-0"
          }`}
        >
          <h1
            style={{ fontFamily: '"Block Berthold", sans-serif' }}
            className="text-[#fb8500] custom-font text-6xl font-bold"
          >
            SCHEDULIFY
          </h1>
          <p className="text-lg text-gray-700">
            Your Course, Your Time, Your Way!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
