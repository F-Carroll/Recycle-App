import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../actions";
const SettingsHandler = () => {
  const [selected, setSelected] = useState("");
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();

  const getLocations = async () => {
    try {
      const response = await fetch(
        "https://desolate-waters-26756.herokuapp.com/api/locations"
      );
      const jsonData = await response.json();

      setLocations(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getLocations();
    const data = localStorage.getItem("current selected location"); //setting data to current localStorage which is nothing, therefore filter is set to nothing.
    if (data) {
      setSelected(JSON.parse(data));
    }
  }, []);

  let type = null;

  let options = [];

  useEffect(() => {
    dispatch(setSelectedLocation([options]));
  });

  locations.forEach((loc) => {
    if (selected === loc.location_name) {
      type = loc.location_materials;
    }
  });

  if (type) {
    options = type;
  }

  //check for location change
  return null;
};

export default SettingsHandler;
