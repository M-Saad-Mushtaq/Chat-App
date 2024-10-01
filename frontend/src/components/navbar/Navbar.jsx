import React from "react";

function NavBar({ toggleShowSidebar }) {
  return (
    <div className="navbar bg-neutral text-neutral-content w-full fixed top-0 z-50">
      <div
        className="flex-none"
        onClick={() => {
          toggleShowSidebar();
        }}
      >
        <button className="btn btn-square btn-ghost hover:bg-white hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a
          href=""
          className="btn btn-ghost text-xl hover:bg-white hover:text-black"
        >
          Chat App
        </a>
      </div>
    </div>
  );
}

export default NavBar;
