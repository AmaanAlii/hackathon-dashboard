import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import calculateCountdown from "../utils/calculateCountdown";
import dateFormatter from "../utils/dateFormatter";

import clockIcon from "../assets/icons/clockIcon.svg";
import eventPageSkillIcon from "../assets/icons/eventPageSkillIcon.svg";
import EditEventModal from "../components/editEventModal";
import { deleteHackathon } from "../redux/hackathonsSlice";
import internalLinks from "../routes/routes";
import DeleteConfirmationModal from "../components/deleteConfirmationModal";

function SingleEventPage() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const { id } = useParams();

  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const handleDeleteConfirmationModalOpen = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const handleEditModalOpen = () => setEditEventModalOpen(true);

  const hackathons = useSelector((state) => state.hackathons.hackathons);
  //   console.log("hackathons in single event page:", hackathons);

  const currentHackathon = hackathons.find((event) => event.id === Number(id));
  //   console.log("currentHackathon:", currentHackathon);
  const [eventStatus, setEventStatus] = useState(null);

  const eventEndDate = new Date(currentHackathon?.endDate);
  const eventStartDate = new Date(currentHackathon?.startDate);

  useEffect(() => {
    if (currentHackathon) {
      const status = calculateCountdown(
        currentHackathon?.startDate,
        currentHackathon?.endDate
      );
      if (status) {
        if (status?.eventStatus === "Active") {
          const endsOnFormattedDate = dateFormatter(eventEndDate);
          setEventStatus({
            prefix: "Ends on",
            date: endsOnFormattedDate,
          });
        } else if (status?.eventStatus === "Upcoming") {
          const startsOnFormattedDate = dateFormatter(eventStartDate);
          setEventStatus({
            prefix: "Starts on",
            date: startsOnFormattedDate,
          });
        } else if (status?.eventStatus === "Past") {
          const endedOnFormattedDate = dateFormatter(eventEndDate);
          setEventStatus({
            prefix: "Ended on",
            date: endedOnFormattedDate,
          });
        }
      }
    }
  }, [currentHackathon]);

  //   console.log("eventStatus:", eventStatus);

  //   const handleDeleteEvent = () => {
  //     if (window.confirm("Are you sure you want to delete this Hackathon?")) {
  //       if (currentHackathon.id) {
  //         dispatch(deleteHackathon(currentHackathon.id));
  //         navigate(internalLinks.home);
  //       }
  //     }
  //   };

  return (
    <>
      {currentHackathon ? (
        <div className=" w-full">
          <div
            className=" w-full h-[300px] bg-[#083145] text-white 
      flex flex-col justify-center items-satrt gap-5 text-left pl-[100px]"
          >
            <span
              className={` w-fit px-2 py-1 rounded-md text-black font-medium 
            flex justify-center items-center gap-2 ${
              eventStatus?.prefix === "Ended on"
                ? " bg-red-400"
                : "bg-[#FBCD5D]"
            }`}
            >
              <img src={clockIcon} alt="Clock" />
              {eventStatus &&
                `${eventStatus?.prefix} ${eventStatus?.date} (Indian Standard Time)`}
            </span>
            <h2 className=" text-3xl font-semibold">
              {currentHackathon?.name}
            </h2>
            <span>{currentHackathon?.description}</span>
            <span
              className=" bg-white text-[#083145] font-medium rounded-md w-fit px-4 py-1 
        gap-2 flex justify-center items-center"
            >
              <img src={eventPageSkillIcon} alt="Skill" />
              {currentHackathon?.level}
            </span>
          </div>
          <div className=" w-full">
            <div className=" w-full h-14 flex justify-between items-center px-[100px] shadow-lg shadow-gray-200">
              <h4 className=" h-full flex justify-center items-center px-2 border-b-4 border-green-600 font-bold">
                Overview
              </h4>
              <div className=" flex gap-5">
                <button
                  onClick={handleEditModalOpen}
                  className=" bg-green-600 min-w-20 min-h-8 rounded-lg text-white font-bold
             hover:bg-transparent hover:border-2 hover:border-green-600 hover:text-green-600 "
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteConfirmationModalOpen}
                  className=" min-w-20 min-h-8 rounded-lg text-red-500 font-bold 
            border-2 border-red-300 hover:text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className=" text-left flex flex-col justify-start items-start gap-5 pl-[100px] pr-[200px] pt-10 text-gray-500 font-medium">
              {currentHackathon?.overview
                ? currentHackathon?.overview?.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))
                : currentHackathon?.description}
            </div>
          </div>
          <EditEventModal
            setEditEventModalOpen={setEditEventModalOpen}
            editEventModalOpen={editEventModalOpen}
            initialData={currentHackathon}
          />
        </div>
      ) : (
        <div className=" w-full h-[100vh] flex justify-center items-center">
          <span>No Data</span>
        </div>
      )}
      <DeleteConfirmationModal
        handleOpen={handleDeleteConfirmationModalOpen}
        setOpen={setDeleteConfirmationModalOpen}
        open={deleteConfirmationModalOpen}
        idToDelete={currentHackathon?.id}
      />
    </>
  );
}

export default SingleEventPage;
