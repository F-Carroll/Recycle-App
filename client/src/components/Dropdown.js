import React, { useState, useEffect, Fragment } from "react";
import ListItems from "./ListItems";
import { v4 as uuidv4 } from "uuid";

const Dropdown = () => {
  const [selected, setSelected] = React.useState("");
  const [locations, setLocations] = useState([]);

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
  }, []);

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  let type = null;

  let options = [];

  locations.map((loc) => {
    if (selected === loc.location_name) {
      type = loc.location_materials;
    }
  });

  if (type) {
    options = type;
  }

  return (
    <Fragment>
      <form>
        <div>
          <select id="selectid"  onChange={changeSelectOptionHandler}>
            <option>Choose Location...</option>
            {locations.map((loc) => (
              <option key={loc.location_id} type={loc.location_materials}>{loc.location_name}</option>
            ))}
          </select>
        </div>
      </form>
      <ListItems location={[options]} />
    </Fragment>
  );
};

export default Dropdown;
