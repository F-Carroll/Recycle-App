import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../actions";

const LocationSelector = () => {
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
    const data = localStorage.getItem("current selected location"); //get current selected location from local storage
    if (data) {
      setSelected(JSON.parse(data));
    }
  }, []);

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
    updateLocalStorageLocation(event.target.value); //update local storage with new selected location
  };

  const updateLocalStorageLocation = (locationValue) => {
    localStorage.setItem(
      "current selected location",
      JSON.stringify(locationValue)
    );
  };

  // let type = null;

  // let options = [];

  useEffect(() => {
    dispatch(setSelectedLocation(selected)); //stores selected location into redux store
  });

  // locations.forEach((loc) => {
  //   if (selected === loc.location_name) {
  //     type = loc.location_materials;
  //   }
  // });

  // if (type) {
  //   options = type;
  // }

  return (
    <>
      <div className="relative inline-flex w-full">
        <svg
          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fillRule="nonzero"
          />
        </svg>
        <select
          className="pr-5 bg-gray-100 appearance-none border-2 rounded-md w-full border-gray-100 p-2 leading-tight truncate focus:outline-none focus:bg-white focus:border-gray-300"
          placeholder="Choose..."
          onChange={changeSelectOptionHandler}
          value={selected || "default"}
        >
          <option value="default" disabled>
            Select a location
          </option>
          {locations.map((loc) => (
            <option key={loc.location_id} type={loc.location_materials}>
              {loc.location_name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LocationSelector;
