import React,{useState, useContext, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";
import {useDispatch, useSelector} from 'react-redux';
import {setItems} from '../actions';


const SearchResult = (props) => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query)
  const items = useSelector(state => state.items)
  const selectedLocation = useSelector(state => state.selectedLocation)
  
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");
        const jsonData = await response.json();
  
        dispatch(setItems(jsonData))
      } catch (error) {
        console.error(error.message);
      }
    };
  
    useEffect(() => {
      getItems();
      // document.getElementById("search").focus();
    }, []);

      const fuse = new Fuse(items, {
        keys: ["barcode", "product_name"],
        includeScore: true,
      });

      const results = fuse.search(query);
  
    const itemResults = query ? results.map((result) => result.item) : items;
  
    var arr2 = selectedLocation[0]

    console.log(arr2)
  
    function RenderList({ items }) {
      if (items?.length) {
        return items.map((item) => <li key={uuidv4()}>{item}</li>);
      } else {
        return <p>No items</p>;
      }
    }
  
    return (
      <>
        {itemResults.map((item) => {
          const RecycleList = item.items.filter((item) => arr2.includes(item));
          const WasteList = item.items.filter((item) => !arr2.includes(item));
  
          return (
            <div className="mb-3" key={item.product_id}>
              <h4>{item.product_name}</h4>
              <p className="mb-0">{item.barcode}</p>
              <div>
                <p className="mb-0 font-weight-bold">Recycle</p>
                <RenderList items={RecycleList} />
              </div>
              <div>
                <p className="mb-0 font-weight-bold">Waste</p>
                <RenderList items={WasteList} />
              </div>
              <p>Last updated: {item.record_date.split("T00:00:00.000Z")}</p>
            </div>
          );
        })}
      </>
    );
  };
  
  export default SearchResult;
  
