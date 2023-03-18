import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../actions";
import NoResult from "./NoResult";

const SearchResult = (props) => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);
  const items = useSelector((state) => state.items);
  const selectedLocation = useSelector((state) => state.selectedLocation);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("/api/items");
        const jsonData = await response.json();

        dispatch(setItems(jsonData));
      } catch (error) {
        console.error(error.message);
      }
    };

    getItems();
    document.getElementById("search").focus();
  }, [dispatch]);

  const fuse = new Fuse(items, {
    useExtendedSearch: true,
    keys: ["barcode", "product_name"],
    includeScore: true,
  });

  const results = fuse.search("'" + query);

  const itemResults = results.map((result) => result.item);

  if (itemResults.length === 0 && query.length > 2) {
    return <NoResult />;
  }

  var arr2 = selectedLocation[0];

  function RenderList({ items }) {
    if (items?.length) {
      return (
        <div className="h-9/12 ">
          {items.map((item) => (
            <p key={uuidv4()}>{item}</p>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex h-7/12 text-gray-400">
          <p className="m-auto">No items</p>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col mt-1">
      {itemResults.map((item) => {
        const RecycleList = item.items.filter((item) => arr2.includes(item));
        const WasteList = item.items.filter((item) => !arr2.includes(item));

        return (
          <div
            key={item.product_id}
            className="bg-gray-100 w-11/12 md:w-2/5 my-3 p-2 self-center rounded-md border-t-4 border-primary-green "
          >
            <div className="h-3/12">
              <h1 className="pl-2 pt-1 text-xl font-semibold">
                {item.product_name}
              </h1>
              <h2 className="pl-2">{item.barcode}</h2>
            </div>
            <div className="flex flex-row h-9/12 pb-2 mt-2">
              <div className="w-1/2 border-r-2 text-center">
                <svg
                  className="w-8 h-8 block m-auto mb-1.5"
                  fill="none"
                  stroke="#60D394"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <RenderList items={RecycleList} />
              </div>
              <div className="w-1/2 text-center">
                <svg
                  className="w-8 h-8 block m-auto mb-1.5"
                  fill="none"
                  stroke="#EE6055"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <RenderList items={WasteList} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
