import { useDispatch } from "react-redux";
import EventForm from "../components/eventForm";
import { useNavigate } from "react-router-dom";
import { addHackathon } from "../redux/hackathonsSlice";
import internalLinks from "../routes/routes";
import { useState } from "react";

function AddNewEventPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddEventFormSubmit = (data) => {
    // console.log("Submitted Data:", data);
    const newEvent = { ...data, id: Date.now() };
    setIsSuccess(true);
    setTimeout(() => {
      dispatch(addHackathon(newEvent));
      navigate(internalLinks.home);
      setIsSuccess(false);
    }, 3000);
  };
  return (
    <div className=" bg-blue-50 w-full flex flex-col justify-center items-start pt-20 gap-10">
      <h2 className=" ml-20 text-3xl font-semibold">Challenge Details</h2>
      <div className=" bg-white w-full h-auto p-20 flex justify-start items-start">
        {isSuccess ? (
          <div className=" flex flex-col justify-start items-start gap-5">
            <span className=" text-green-500 font-medium">
              Hackathon Added Successfully!
            </span>
            <span className=" font-medium">Redirecting you to Homepage...</span>
          </div>
        ) : (
          <EventForm initialData={""} onSubmit={handleAddEventFormSubmit} />
        )}
      </div>
    </div>
  );
}

export default AddNewEventPage;
