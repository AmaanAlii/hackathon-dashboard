import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import internalLinks from "../routes/routes";
import { deleteHackathon } from "../redux/hackathonsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function DeleteConfirmationModal({
  handleOpen,
  setOpen,
  open,
  idToDelete,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteMessage, setDeleteMessage] = React.useState({
    isDeleted: false,
    message: null,
    success: false,
    error: false,
  });

  const [loader, setLoader] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleDeleteEvent = () => {
    if (idToDelete) {
      setLoader(true);
      setDeleteMessage({
        isDeleted: false,
        message: "Deleting..",
      });
      setTimeout(() => {
        dispatch(deleteHackathon(idToDelete));
        setLoader(false);
        setDeleteMessage({
          isDeleted: true,
          success: true,
          message: "Hackathon deleted successfully!",
        });
        setTimeout(() => {
          setDeleteMessage({
            isDeleted: false,
            message: null,
            error: false,
            success: false,
          });
          navigate(internalLinks.home);
        }, 5000);
      }, 2000);
    } else {
      setDeleteMessage({
        isDeleted: false,
        error: true,
        message: "Could not find the ID to delete the Hackathon!",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!deleteMessage.message && !deleteMessage.isDeleted && (
          <div className=" flex flex-col justify-start items-start gap-5">
            <span className=" font-medium">
              Are you sure you want to delete this Hackathon?
            </span>
            <div className=" flex justify-center items-center gap-5">
              <button
                onClick={handleDeleteEvent}
                className=" w-[120px] py-1 rounded-md font-medium  
            text-red-500 bg-transparent border-2 
            border-red-500 hover:text-white hover:bg-red-500 "
              >
                Yes
              </button>
              <button
                onClick={handleClose}
                className=" w-[120px] py-1 rounded-md font-medium  
            text-green-500 bg-transparent border-2 
            border-green-500 hover:text-white hover:bg-green-500 "
              >
                No
              </button>
            </div>
          </div>
        )}
        {loader && deleteMessage.message && (
          <div>
            <div className=" w-10 h-10 border-b-2 border-green-500 animate-spin rounded-full" />
            <span>{deleteMessage.message}</span>
          </div>
        )}
        {deleteMessage.success && deleteMessage.message ? (
          <div className=" flex flex-col justify-start items-start gap-5 font-medium">
            <span className=" text-green-500">{deleteMessage.message}</span>
            <span>You are being redirected to the Home Page!</span>
          </div>
        ) : (
          deleteMessage.error &&
          deleteMessage.message && (
            <div className=" flex flex-col justify-start items-start gap-5 font-medium">
              <span className=" text-red-500">
                We have encountered an error: {deleteMessage.message}
              </span>
              <span>You are being redirected to the Home Page!</span>
            </div>
          )
        )}
      </Box>
    </Modal>
  );
}
