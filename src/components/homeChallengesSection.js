import { useSelector } from "react-redux";
// import { hackathons } from "../data/hackathonsMockData";
import ChallengeCard from "./challengeCard";
import { useEffect, useRef, useState } from "react";

function ChallengesSection() {
  //   const currentDate = new Date();
  //   console.log(
  //     "currentDate:",
  //     currentDate.toLocaleString("en-IN", {
  //       hour: "numeric",
  //       minute: "numeric",
  //       hour12: true,
  //     })
  //   );

  //   console.log(currentDate);
  const hackathons = useSelector((state) => state.hackathons.hackathons);

  const [hackathonsState, setHackathonsState] = useState(null);

  //   console.log("hackathons:", hackathons);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [sortOrder, setSortOrder] = useState("Newest First");

  const filterMenuRef = useRef(null);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const handleFilterToggle = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleLevelChange = (level) => {
    if (selectedLevel.includes(level)) {
      setSelectedLevel(selectedLevel.filter((l) => l !== level));
    } else {
      setSelectedLevel([...selectedLevel, level]);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // For filtering and sorting data
  useEffect(() => {
    if (hackathons) {
      const filteredHackathons = hackathons
        ?.filter((hackathon) => {
          return hackathon.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
        ?.filter((hackathon) => {
          if (selectedStatus === "All") return true;
          const currentDate = new Date();
          const startDate = new Date(hackathon.startDate);
          const endDate = new Date(hackathon.endDate);

          if (selectedStatus === "Active") {
            return currentDate >= startDate && currentDate <= endDate;
          }
          if (selectedStatus === "Upcoming") {
            return currentDate < startDate;
          }
          if (selectedStatus === "Past") {
            return currentDate > endDate;
          }
          return true;
        })
        ?.filter((hackathon) => {
          if (selectedLevel.length === 0) return true;
          return selectedLevel.includes(hackathon.level);
        });

      if (sortOrder === "Newest First") {
        filteredHackathons.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
      } else if (sortOrder === "Oldest First") {
        filteredHackathons.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
      }

      setHackathonsState(filteredHackathons);
    }
  }, [hackathons, searchTerm, selectedStatus, selectedLevel, sortOrder]);

  // For autoclosing filter menu if the user clicks outside the menu

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setFilterMenuOpen(false);
      }
    };

    if (filterMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuOpen]);

  if (hackathonsState === null) {
    return <div>Loading hackathons...</div>;
  }

  return (
    <section className=" w-full h-auto flex flex-col justify-center items-center ">
      <div className=" w-full h-auto bg-[#062A3B] py-5 flex gap-5 flex-col justify-center items-center ">
        <h5 className=" text-white text-3xl font-semibold">
          Explore Challenges
        </h5>
        <div className=" flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-lg w-[300px] bg-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="relative inline-block text-left">
            <button
              onClick={handleFilterToggle}
              className="px-4 py-2 rounded-lg bg-white"
            >
              Filter <span className="ml-2">&#x25BC;</span>
            </button>
            <div
              ref={filterMenuRef}
              className={`${
                filterMenuOpen ? " block" : "hidden"
              } absolute right-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg p-4`}
            >
              <h4 className="text-lg font-semibold mb-2">Status</h4>
              <div>
                {["All", "Active", "Upcoming", "Past"].map((status) => (
                  <div key={status}>
                    <input
                      type="radio"
                      id={status}
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={() => handleStatusChange(status)}
                    />
                    <label className="ml-2" htmlFor={status}>
                      {status}
                    </label>
                  </div>
                ))}
              </div>
              <h4 className="text-lg font-semibold mt-4 mb-2">Level</h4>
              <div>
                {["Easy", "Medium", "Hard"].map((level) => (
                  <div key={level}>
                    <input
                      type="checkbox"
                      id={level}
                      value={level}
                      checked={selectedLevel.includes(level)}
                      onChange={() => handleLevelChange(level)}
                    />
                    <label className="ml-2" htmlFor={level}>
                      {level}
                    </label>
                  </div>
                ))}
              </div>
              <h4 className="text-lg font-semibold mt-4 mb-2">Sort By</h4>
              <div>
                {["Newest First", "Oldest First"].map((order) => (
                  <div key={order}>
                    <input
                      type="radio"
                      id={order}
                      name="sortOrder"
                      value={order}
                      checked={sortOrder === order}
                      onChange={() => handleSortChange(order)}
                    />
                    <label className="ml-2" htmlFor={order}>
                      {order}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className=" w-full h-auto bg-[#083145] flex justify-center items-center 
      flex-wrap gap-10 py-20"
      >
        {hackathonsState?.map((hackathon, index) => (
          <ChallengeCard
            key={index}
            img={hackathon?.image}
            id={hackathon?.id}
            name={hackathon?.name}
            startDate={hackathon?.startDate}
            endDate={hackathon?.endDate}
          />
        ))}
      </div>
    </section>
  );
}

export default ChallengesSection;
