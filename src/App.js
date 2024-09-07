// import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hackathons } from "./data/hackathonsMockData.js";
import { loadHackathons } from "./redux/actions.js";

import Home from "./pages/homePage.js";
import internalLinks from "./routes/routes.js";
import NavBar from "./components/navbar.js";

import { useEffect } from "react";
import SingleEventPage from "./pages/singleEventPage.js";
import AddNewEventPage from "./pages/addNewEventPage.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Checking if hackathons already exist in localStorage

    const storedHackathons = localStorage.getItem("hackathons");

    if (!storedHackathons) {
      // If not, initializing localStorage with the initial data
      localStorage.setItem("hackathons", JSON.stringify(hackathons));
      dispatch(loadHackathons(hackathons)); // Load the initial mock data into Redux
    } else {
      // Loading existing data from localStorage
      dispatch(loadHackathons(JSON.parse(storedHackathons)));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Home />} path={internalLinks.home} />
          <Route
            element={<SingleEventPage />}
            path={`${internalLinks.singleEvent}/:id`}
          />
          <Route element={<AddNewEventPage />} path={internalLinks.addEvent} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
