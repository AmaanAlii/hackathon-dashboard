import { useDispatch } from "react-redux";
import EventForm from "../components/eventForm";
import { useNavigate } from "react-router-dom";
import { addHackathon } from "../redux/hackathonsSlice";
import internalLinks from "../routes/routes";

function AddNewEventPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddEventFormSubmit = (data) => {
    console.log("Submitted Data:", data);
    const newEvent = { ...data, id: Date.now() };

    dispatch(addHackathon(newEvent));

    navigate(internalLinks.home);
  };
  return (
    <div className=" bg-blue-50 w-full flex flex-col justify-center items-start pt-20 gap-10">
      <h2 className=" ml-20 text-3xl font-semibold">Challenge Details</h2>
      <div className=" bg-white w-full h-auto p-20 flex justify-start items-start">
        <EventForm initialData={""} onSubmit={handleAddEventFormSubmit} />
      </div>
    </div>
  );
}

export default AddNewEventPage;
