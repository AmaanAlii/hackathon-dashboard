import homeBannerMetricsAiIcon from "../assets/icons/homeBannerMetricsAiIcon.svg";
import { metricsData } from "../data/metricsMockData";

function MetricsComp() {
  return (
    <section className=" w-[80%] flex justify-between items-center text-white">
      {metricsData?.map((metric, index) => (
        <div
          key={index}
          className={` flex gap-5 justify-center items-center  
            ${index === 2 ? "" : "border-r-2 border-[#ececec] pr-20"}`}
        >
          <img src={metric?.img} alt="icon" />
          <div className=" flex flex-col justify-center items-start">
            <h5 className=" text-3xl font-semibold">{metric?.metricValue}</h5>
            <span>{metric?.heading}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MetricsComp;
