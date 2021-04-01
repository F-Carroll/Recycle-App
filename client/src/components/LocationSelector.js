import { chakra } from '@chakra-ui/system';
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {setSelectedLocation} from '../actions';
import {Select} from '@chakra-ui/react'
const LocationSelector = () => {
    const [selected, setSelected] = React.useState("");
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
    dispatch(setSelectedLocation([options]))
    return (
      <>
        <form>
          <div>
          <Select variant="filled" placeholder="Location" onChange={changeSelectOptionHandler}>
 {locations.map((loc) => (
      <option key={loc.location_id} type={loc.location_materials}>{loc.location_name}</option>
 ))}
</Select>
          </div>
        </form>
  
      </>
    );
  };

export default LocationSelector

