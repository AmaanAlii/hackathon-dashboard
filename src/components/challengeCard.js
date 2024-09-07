import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import calculateCountdown from "../utils/calculateCountdown";
import tickMarkIcon from "../assets/icons/tickMark.svg";
import { useNavigate } from "react-router-dom";
import internalLinks from "../routes/routes";
import dateFormatter from "../utils/dateFormatter";

function ChallengeCard({ img, id, name, startDate, endDate }) {
  const navigate = useNavigate();

  const [calculatedStatus, setCalculatedStatus] = React.useState(null);

  const [countDown, setCountDown] = React.useState(null);

  const intervalIdRef = React.useRef(null);

  const eventEndDate = new Date(endDate);

  //   const endDate12HrFormat = eventEndDate.toLocaleString("en-IN", {
  //     day: "2-digit",
  //     month: "short",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });

  const endDate12HrFormat = dateFormatter(eventEndDate);

  React.useEffect(() => {
    // const calculateStatus = () => {
    //   const currentDate = new Date();
    //   const eventStartDate = new Date(startDate);

    //   if (currentDate < eventStartDate) {
    //     setCalculatedStatus("Upcoming");
    //   } else if (
    //     currentDate >= eventStartDate &&
    //     currentDate <= new Date(endDate)
    //   ) {
    //     setCalculatedStatus("Active");
    //   } else {
    //     setCalculatedStatus("Past");
    //   }
    // };

    // const calculateCountDown = () => {
    //   const currentDate = new Date();
    //   const eventStartDate = new Date(startDate);
    //   const eventEndDate = new Date(endDate);
    //   const timeDiff = eventStartDate - currentDate;

    //   if (timeDiff > 0) {
    //     const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor(
    //       (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //     );
    //     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    //     setCountDown(`${days} : ${hours} : ${minutes} `);
    //   } else if (timeDiff < 0) {
    //     const eventEndsIn = eventEndDate - eventStartDate;
    //     const days = Math.floor(eventEndsIn / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor(
    //       (eventEndsIn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //     );
    //     const minutes = Math.floor(
    //       (eventEndsIn % (1000 * 60 * 60)) / (1000 * 60)
    //     );

    //     setCountDown(`${days} : ${hours} : ${minutes} `);
    //   } else {
    //     setCountDown("00:00:00");
    //   }
    // };

    // calculateStatus();
    // calculateCountDown();

    const completeStatusCal = () => {
      const completeStatus = calculateCountdown(startDate, endDate);
      setCalculatedStatus(completeStatus.eventStatus);
      setCountDown(completeStatus.eventCountDown);
    };

    completeStatusCal();
    // avoiding starting an interval if the event status is "Past"

    if (calculatedStatus !== "Past") {
      intervalIdRef.current = setInterval(() => {
        completeStatusCal();
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current); // Clearing the interval if status is "Past"
    }

    return () => clearInterval(intervalIdRef.current);
  }, [startDate, endDate]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 500,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "20px",
      }}
      className=" hover:shadow-xl hover:shadow-green-400 hover:cursor-pointer"
      onClick={() => {
        navigate(`${internalLinks.singleEvent}/${id}`);
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        className=" min-h-[180px]"
        image={img}
      />
      <CardContent className=" flex flex-col justify-start items-center gap-5">
        <Typography gutterBottom variant="h5" component="div">
          <span
            className={` ${
              calculatedStatus === "Upcoming"
                ? " bg-[#FCF2D3] text-gray-600"
                : calculatedStatus === "Active"
                ? " bg-[#D2E5D4] text-[#44924C]"
                : calculatedStatus === "Past"
                ? " bg-[#FDDED4] text-[#666666]"
                : ""
            } p-2 rounded-md text-sm font-semibold`}
          >
            {calculatedStatus}
          </span>
        </Typography>
        <Typography
          className=" min-h-16"
          sx={{ fontWeight: "medium" }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {name}
        </Typography>
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {startDate}
        </Typography> */}
        {calculatedStatus === "Upcoming" && (
          <div className=" flex flex-col gap-1 justify-center items-center">
            <span className=" text-gray-700 font-medium">Starts in</span>
            <span className=" text-gray-800 text-2xl font-medium">
              {countDown}
            </span>
            <span className=" text-gray-600 font-medium text-[10px]">
              Days&nbsp;&nbsp;&nbsp;Hours&nbsp;&nbsp;&nbsp;Mins
            </span>
          </div>
        )}
        {calculatedStatus === "Active" && (
          <div className=" flex flex-col gap-1 justify-center items-center">
            <span className=" text-gray-700 font-medium">Ends in</span>
            <span className=" text-gray-800 text-2xl font-medium">
              {countDown}
            </span>
            <span className=" text-gray-600 font-medium text-[10px]">
              Days&nbsp;&nbsp;&nbsp;Hours&nbsp;&nbsp;&nbsp;Mins
            </span>
          </div>
        )}
        {calculatedStatus === "Past" && (
          <div className=" flex flex-col gap-1 justify-center items-center">
            <span className=" text-gray-700 font-medium">Ended on</span>
            <span className=" text-gray-800 text-2xl font-medium">
              {endDate12HrFormat}
            </span>
          </div>
        )}
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {calculatedStatus !== "Past" ? (
          <Button
            size="small"
            sx={{
              backgroundColor: "#43924D",
              color: "white",
              fontWeight: "bold",
              width: "180px",
              textTransform: "capitalize",
              display: "flex",
              gap: "10px",
            }}
          >
            <img src={tickMarkIcon} alt="Tick" />
            Participate Now
          </Button>
        ) : (
          <span className=" text-xl text-red-500 font-semibold">
            Window Closed
          </span>
        )}
      </CardActions>
    </Card>
  );
}

export default ChallengeCard;
