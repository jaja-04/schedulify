import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Loader from "../components/Loader";
import bgImage from "../assets/bg.png";
import Logo from "../assets/logo-sm.png";

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100); 
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundImage: `url(${bgImage})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100%",
          }}
          className={`flex flex-col items-center justify-center h-screen transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="fixed flex items-center flex-col">
            <img
              className="w-45 -mt-5 items-center h-auto"
              src={Logo}
              alt="logo-sm"
              title="Schedulify"
            />
            <h1 className="text-6xl mt-10 text-center text-[#ded8cf] font-bold font-poppins">
              <span className="text-[#fa8606]">Streamline</span> your schedule
              with ease
              <br />
              —get started with us <span className="text-[#fa8606]">today</span>
              !
            </h1>
            <div className="flex flex-col mt-10 items-center">
              <button
                onClick={() => navigate("/student-login")}
                className="bg-[#fa8606] mt-15 w-70 h-14 cursor-pointer font-semibold rounded-[30px] p-3 hover:scale-110 hover:bg-[#db6d00] transition-all duration-300"
              >
                I am a Student
              </button>
              <button
                onClick={() => navigate("/faculty-login")}
                className="bg-[#fa8606] mt-4 w-70 h-14 cursor-pointer font-semibold rounded-[30px] p-3 hover:scale-110 hover:bg-[#db6d00] transition-all duration-300"
              >
                Faculty Member
              </button>
              <button
                onClick={() => navigate("/admin-login")}
                className="bg-[#fa8606] mt-4 w-70 h-14 cursor-pointer font-semibold rounded-[30px] p-3 hover:scale-110 hover:bg-[#db6d00] transition-all duration-300"
              >
                Administrator
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
