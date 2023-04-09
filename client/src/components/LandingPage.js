import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col py-2 mt-7">
        <div className="grid grid-cols-1 gap-4 mx-3 sm:grid-cols-2 max-w-3xl self-center">
          <div className="bg-gray-100 rounded-lg">
            <div className="flex flex-row m-3 self-center">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="#60D394"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h1 className="ml-2 text-xl font-semibold ">Search</h1>
            </div>
            <div className="px-3 mb-3">
              <p>
                Search for products either using the barcode or the product name
                using the search bar at the top of the screen.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg">
            <div className="flex flex-row m-3 self-center">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="#60D394"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="ml-2 text-xl font-semibold ">
                Add New Products & Locations
              </h1>
            </div>
            <div className="px-3 mb-3">
              <p>
                New Products and Locations can be added by using the Hamburger
                Menu in the top right corner of the application.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg sm:col-span-2">
            <div className="flex flex-row m-3 self-center">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="#60D394"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <h1 className="ml-2 text-xl font-semibold ">
                Filter by Location
              </h1>
            </div>
            <div className="px-3 mb-3">
              <p>
                Filter recyclable materials based on your local recycling
                facility. This ensures what you put in your recycling bin is
                exactly what is recycled by your waste collector.
              </p>
              <p className="mt-2">
                Local recycling facility can be changed in Settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
