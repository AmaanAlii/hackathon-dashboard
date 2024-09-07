import { homeIntroCardsData } from "../data/homeIntroCardsData";
import HomeIntroCard from "./homeIntroCard";

function HomeIntroSection() {
  return (
    <section className=" w-full flex flex-col justify-center items-center gap-16">
      <h3 className=" text-4xl font-semibold">
        Why Participate in{" "}
        <span className=" text-[#44924C]">AI Challenges?</span>
      </h3>
      <div className=" w-[90%] flex flex-wrap gap-10 justify-center items-start ">
        {homeIntroCardsData?.map((card, index) => (
          <HomeIntroCard
            img={card?.img}
            heading={card?.heading}
            subText={card?.subText}
          />
        ))}
      </div>
    </section>
  );
}

export default HomeIntroSection;
