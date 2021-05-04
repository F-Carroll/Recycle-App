import React from "react";
import LocationSelector from "./LocationSelector";

export default function Settings() {
  function handleClose() {
    window.location = "/";
  }

  return (
    <div className="h-screen80 relative">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl p-5 self-center font-semibold">Settings</h1>
        <button
          className="self-center p-2 mr-6 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={handleClose}
        >
          <p className="sr-only">Close</p>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col mt-5 items-center">
        <div className="w-2/3 sm:w-96 m-2.5 h-20 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1.5">
            Location Name
          </label>
          <LocationSelector />
        </div>
        <div className="w-full absolute bottom-0 text-center">
          <p className="text-gray-400">Version Details</p>
        </div>
      </div>
    </div>
  );
}
