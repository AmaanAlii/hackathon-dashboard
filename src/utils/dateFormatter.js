function dateFormatter(date) {
  const date12HrFormat = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    hourCycle: "h12",
  });
  const formattedDate = date12HrFormat
    .replace(/am/i, "AM")
    .replace(/pm/i, "PM");

  //   console.log("formattedDate:", formattedDate);

  return formattedDate;
}

export default dateFormatter;
