import React from "react";
import { NavLink } from "react-router-dom";

const GetData = ({ title, page, button }) => {
  return (
    <section className="flex flex-col justify-between w-[900px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-32">
      <div className="flex flex-col justify-between md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
        <div className="px-6 py-6 md:px-8 md:py-0">
          <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
            {title}
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
        <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <NavLink
            to={page}
            className="flex items-center px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            {button}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default GetData;
