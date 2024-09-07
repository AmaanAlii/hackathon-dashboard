import { NavLink } from "react-router-dom";
import homeBannerRocketImg from "../assets/icons/homeBannerRocketImg.svg";
import MetricsComp from "./metricsComp";
import internalLinks from "../routes/routes";

function HomeHeroSection() {
  return (
    <div className=" w-full h-auto">
      <div
        className=" w-full h-[75vh] flex justify-between items-center bg-[#083145] text-white 
     px-[120px] py-28"
      >
        <div className=" w-[60%] flex flex-col gap-10 justify-center items-start text-left">
          <h2 className=" text-5xl pl-10 font-semibold border-l-8 border-[#FBCD5D]">
            Accelerate Innovation with Global AI Challenges
          </h2>
          <div className="pl-10 w-full flex flex-col gap-10 justify-center items-start">
            <p className=" text-2xl text-[#ECECEC] ">
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to test on diverse
              datasets allowing you to foster learning through competitions.
            </p>
            <NavLink to={internalLinks.addEvent}>
              <button className=" py-1 px-3 bg-white text-[#083145] font-semibold rounded-lg text-xl">
                Create Challenge
              </button>
            </NavLink>
          </div>
        </div>
        <img className=" w-[400px]" src={homeBannerRocketImg} alt="rocket" />
      </div>
      <div className=" w-full h-[20vh] bg-[#062A3B] flex justify-center items-center">
        <MetricsComp />
      </div>
    </div>
  );
}

export default HomeHeroSection;
