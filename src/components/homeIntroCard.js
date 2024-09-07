function HomeIntroCard({ img, heading, subText }) {
  return (
    <div
      className=" w-[600px] h-[250px] py-20 px-10 rounded-lg  bg-[#F8F9FD]
    flex flex-col justify-center items-start text-left gap-3"
    >
      <img className=" w-[50px]" src={img} alt="icon" />
      <h5 className=" text-2xl font-semibold">{heading}</h5>
      <p className=" text-[#6D6A84]">{subText}</p>
    </div>
  );
}

export default HomeIntroCard;
