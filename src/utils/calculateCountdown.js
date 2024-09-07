// A standalone, reusible function to check the event's status and
// to calculate the event's "Starts in" and "Ends in" countdown if applicable

function calculateCountdown(startDate, endDate) {
  // object to save event status and the count-down(if any)
  let completeStatus = {
    eventStatus: null,
    eventCountDown: null,
  };

  //converting dates to the same format
  const currentDate = new Date();
  const eventStartDate = new Date(startDate);
  const eventEndDate = new Date(endDate);

  if (currentDate < eventStartDate) {
    completeStatus.eventStatus = "Upcoming";
  } else if (currentDate >= eventStartDate && currentDate <= eventEndDate) {
    completeStatus.eventStatus = "Active";
  } else {
    completeStatus.eventStatus = "Past";
  }

  const timeDiff = eventStartDate - currentDate;

  if (timeDiff > 0 && completeStatus.eventStatus === "Upcoming") {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    completeStatus.eventCountDown = `${days} : ${hours} : ${minutes} `;
  } else if (completeStatus.eventStatus === "Active") {
    const eventEndsIn = eventEndDate - currentDate;
    const days = Math.floor(eventEndsIn / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (eventEndsIn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((eventEndsIn % (1000 * 60 * 60)) / (1000 * 60));

    completeStatus.eventCountDown = `${days} : ${hours} : ${minutes} `;
  } else if (completeStatus.eventStatus === "Past") {
    completeStatus.eventCountDown = null;
  }

  return completeStatus;
}

export default calculateCountdown;
