export const loadHackathons = () => {
  return {
    type: "LOAD_HACKATHONS",
    payload: JSON.parse(localStorage.getItem("hackathons")) || [],
  };
};

export const addHackathon = (hackathon) => {
  return {
    type: "ADD_HACKATHON",
    payload: hackathon,
  };
};

export const editHackathon = (hackathon) => {
  return {
    type: "EDIT_HACKATHON",
    payload: hackathon,
  };
};

export const deleteHackathon = (id) => {
  return {
    type: "DELETE_HACKATHON",
    payload: id,
  };
};
