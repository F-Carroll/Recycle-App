import React from "react";
import Hamburger from "./Hamburger";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <ul className="flex items-center justify-between px-2 h-16 shadow-md">
      <li><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-recycle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#60d394" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" />
  <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" transform="rotate(120 12 13)" />
  <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" transform="rotate(240 12 13)" />
</svg></li>
      <li className="w-3/5 sm:w-2/5"><SearchInput /></li>
      <li><Hamburger /></li>
    </ul>
  );
}
