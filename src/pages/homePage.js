import ChallengesSection from "../components/homeChallengesSection";
import HomeHeroSection from "../components/homeHeroSection";
import HomeIntroSection from "../components/homeIntroSection";

function Home() {
  return (
    <div
      className=" w-full flex flex-col 
    justify-center items-center gap-20"
    >
      <HomeHeroSection />
      <HomeIntroSection />
      <ChallengesSection />
    </div>
  );
}

export default Home;
