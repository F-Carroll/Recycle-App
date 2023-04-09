import * as React from "react";
import "./assets/main.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import Settings from "./components/Settings";
import SettingsHandler from "./components/SettingsHandler";
import AddItem from "./components/AddItem";
import AddLocation from "./components/AddLocation";
import LandingPage from "./components/LandingPage";

function App() {
  const query = useSelector((state) => state.query);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <Navbar />
              {query ? null : <LandingPage />}
              <SearchResult />
              <SettingsHandler />
            </div>
          }
        />

        <Route path="/settings" element={<Settings />} />

        <Route path="/add/item" element={<AddItem />} />

        <Route path="/add/location" element={<AddLocation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
