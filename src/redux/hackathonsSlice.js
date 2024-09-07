import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hackathons: JSON.parse(localStorage.getItem("hackathons")) || [],
};

const hackathonsSlice = createSlice({
  name: "hackathons",
  initialState,
  reducers: {
    loadHackathons: (state, action) => {
      state.hackathons = action.payload;
    },
    addHackathon: (state, action) => {
      const newHackathon = action.payload;
      state.hackathons.push(newHackathon);
      localStorage.setItem("hackathons", JSON.stringify(state.hackathons));
    },
    editHackathon: (state, action) => {
      const updatedHackathon = action.payload;
      console.log("state in slices:", state);

      state.hackathons = state.hackathons.map((h) =>
        h.id === updatedHackathon.id ? updatedHackathon : h
      );
      localStorage.setItem("hackathons", JSON.stringify(state.hackathons));
    },
    deleteHackathon: (state, action) => {
      const id = action.payload;
      state.hackathons = state.hackathons.filter((h) => h.id !== id);
      localStorage.setItem("hackathons", JSON.stringify(state.hackathons));
    },
  },
});

export const { loadHackathons, addHackathon, editHackathon, deleteHackathon } =
  hackathonsSlice.actions;

export default hackathonsSlice.reducer;
