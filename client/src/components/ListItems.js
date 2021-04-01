import React, { Fragment, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from "uuid";

const ListItems = (props) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
      });

      setItems(items.filter((item) => item.product_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const jsonData = await response.json();

      setItems(jsonData);
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

  var arr2 = props.location[0];

  function RenderList({ items }) {
    if (items?.length) {
      return items.map((item) => <li key={uuidv4()}>{item}</li>);
    } else {
      return <p>No items</p>;
    }
  }

  return (
    <Fragment>
      <input
        id="search"
        autoComplete="off"
        placeholder="Search"
        type="text"
        value={query}
        onChange={handleOnSearch}
      />

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
    </Fragment>
  );
};

export default ListItems;
