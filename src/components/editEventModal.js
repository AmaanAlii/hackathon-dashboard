import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EventForm from "./eventForm";
import { editHackathon } from "../redux/hackathonsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import internalLinks from "../routes/routes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditEventModal({
  setEditEventModalOpen,
  editEventModalOpen,
  initialData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setEditEventModalOpen(false);

  const handleFormSubmit = (updatedEvent) => {
    // console.log("updatedEvent in editmodal:", updatedEvent);

    dispatch(editHackathon(updatedEvent));

    navigate(internalLinks.home);
  };

  return (
    <div>
      <Modal
        open={editEventModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EventForm initialData={initialData} onSubmit={handleFormSubmit} />
        </Box>
      </Modal>
    </div>
  );
}
