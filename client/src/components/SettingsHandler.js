import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../actions";
const SettingsHandler = () => {
  const [selected, setSelected] = useState("");
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();

  const getLocations = async () => {
    try {
      const response = await fetch("/api/locations"); //fetch locations from database
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

  let type;

  let options = [];

  useEffect(() => {
    dispatch(setSelectedLocation([options])); //sets selected location to an array of accepted recyclable items
  });

  locations.forEach((loc) => {
    if (selected === loc.location_name) {
      type = loc.location_materials;
    }
  });

  if (type) {
    options = type;
  }

  return null;
};

export default SettingsHandler;
