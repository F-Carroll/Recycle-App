import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../actions";
import { Select } from "@chakra-ui/react";
const LocationSelector = () => {
  const [selected, setSelected] = useState("");
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();

  const getLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/locations");
      const jsonData = await response.json();

      setLocations(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getLocations();
    const data = localStorage.getItem("current selected location");
    if (data) {
      setSelected(JSON.parse(data));
    }
  }, []);

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  let type = null;

  let options = [];

  useEffect(() => {
    dispatch(setSelectedLocation([options]));
    localStorage.setItem("current selected location", JSON.stringify(selected));
  });

  locations.forEach((loc) => {
    if (selected === loc.location_name) {
      type = loc.location_materials;
    }
  });

  if (type) {
    options = type;
  }

  return (
    <>
      <form>
        <div>
          <Select
            id="dropdown"
            w="160px"
            variant="filled"
            placeholder="Choose..."
            onChange={changeSelectOptionHandler}
            value={selected}
            textOverflow="ellipsis"
          >
            {locations.map((loc) => (
              <option key={loc.location_id} type={loc.location_materials}>
                {loc.location_name}
              </option>
            ))}
          </Select>
        </div>
      </form>
    </>
  );
};

export default LocationSelector;
