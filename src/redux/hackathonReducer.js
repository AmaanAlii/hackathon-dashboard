const initialState = {
  hackathons: JSON.parse(localStorage.getItem("hackathons")) || [],
};

const hackathonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_HACKATHONS":
      return {
        ...state,
        hackathons: action.payload,
      };

    case "ADD_HACKATHON":
      const newHackathonList = [...state.hackathons, action.payload];
      localStorage.setItem("hackathons", JSON.stringify(newHackathonList));
      return {
        ...state,
        hackathons: newHackathonList,
      };

    case "EDIT_HACKATHON":
      const editedHackathons = state.hackathons.map((h) =>
        h.id === action.payload.id ? action.payload : h
      );
      localStorage.setItem("hackathons", JSON.stringify(editedHackathons));
      return {
        ...state,
        hackathons: editedHackathons,
      };

    case "DELETE_HACKATHON":
      const filteredHackathons = state.hackathons.filter(
        (h) => h.id !== action.payload
      );
      localStorage.setItem("hackathons", JSON.stringify(filteredHackathons));
      return {
        ...state,
        hackathons: filteredHackathons,
      };

    default:
      return state;
  }
};

export default hackathonReducer;
