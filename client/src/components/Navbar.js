import React from "react";
import Hamburger from "./Hamburger";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <ul className="flex items-center justify-between px-2 h-16 shadow-md">
      <li className="">Logo</li>
      <SearchInput />
      <Hamburger />
    </ul>
  );
}
