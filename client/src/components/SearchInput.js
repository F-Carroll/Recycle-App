import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../actions";

export default function SearchInput() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    dispatch(setQuery(value));
  }

  return (
    <>
      <div className="w-full relative flex items-center  text-gray-400  focus-within:text-gray-700 transition duration-300 ease-in-out ">
        <input
        id="search"
          className="w-full bg-gray-100 p-2 rounded-md pl-10 focus:outline-none"
          autoComplete="off"
          placeholder="Search by barcode or product"
          type="text"
          value={query}
          onChange={handleOnSearch}
        />
        <svg
          className="w-5 h-5 absolute left-0 mx-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </>
  );
}
