import React from "react";
import { useAppContext } from "../main";
import { NavLink } from "react-router-dom";

const Name = () => {
  // Access the context using the custom hook
  const { selectedname1, updateSelectedname1, selectedname2, updateSelectedname2, selectedname3, updateSelectedname3, selectedfirst, updateSelectedfirst, selectedfull, updateSelectedfull } = useAppContext();
  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform additional actions if needed
    // ...

    // Navigate to "/k-pop-soulmates" using the selected zodiac sign
    // You can adjust the URL structure based on your needs
    // Example: `/k-pop-soulmates/${selectedZodiacSign}`
    window.location.href = `/todayluck?sign=${selectedname1},${selectedname2},${selectedname3},${selectedfirst},${selectedfull}`;
  };

  return (
    <section className="flex flex-col w-[900px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-col md:h-36">
  <div className="md:flex md:items-center md:justify-center md:w-full md:bg-gray-700">
    <div className="px-6 py-6 md:px-8 md:py-0">
      <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
        4. Predicts Kpop Idols' Luck and Love Today
      </h2>
    </div>
  </div>

  <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit}>
    <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
   <select
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              name="zodiacSign"
              value={selectedname1}
              onChange={(e) => updateSelectedname1(e.target.value)}
              aria-label="Select your zodiac sign"
            >
              {/* Add an initial blank option */}
              <option value="" disabled hidden>
                Select current year sign
              </option>
              <option value="rat">Rat 🐭</option>
              <option value="goat">Goat 🐐</option>
              <option value="rooster">Rooster 🐓</option>
              <option value="dog">Dog 🐕</option>
              <option value="pig">Pig 🐖</option>
              <option value="ox">Ox 🐂</option>
              <option value="tiger">Tiger 🐅</option>
              <option value="rabbit">Rabbit 🐇</option>
              <option value="dragon">Dragon 🐉</option>
              <option value="snake">Snake 🐍</option>
              <option value="horse">Horse 🐎</option>
              <option value="monkey">Monkey 🐒</option>
            </select>
            <select
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              name="zodiacSign2"
              value={selectedname2}
              onChange={(e) => updateSelectedname2(e.target.value)}
              aria-label="Select your zodiac sign"
            >
              {/* Add an initial blank option */}
              <option value="" disabled hidden>
                Select current month sign
              </option>
              <option value="rat">Rat 🐭</option>
              <option value="goat">Goat 🐐</option>
              <option value="rooster">Rooster 🐓</option>
              <option value="dog">Dog 🐕</option>
              <option value="pig">Pig 🐖</option>
              <option value="ox">Ox 🐂</option>
              <option value="tiger">Tiger 🐅</option>
              <option value="rabbit">Rabbit 🐇</option>
              <option value="dragon">Dragon 🐉</option>
              <option value="snake">Snake 🐍</option>
              <option value="horse">Horse 🐎</option>
              <option value="monkey">Monkey 🐒</option>
            </select>
            <select
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              name="zodiacSign3"
              value={selectedname3}
              onChange={(e) => updateSelectedname3(e.target.value)}
              aria-label="Select your zodiac sign"
            >
              {/* Add an initial blank option */}
              <option value="" disabled hidden>
                Select current day sign
              </option>
              <option value="rat">Rat 🐭</option>
              <option value="goat">Goat 🐐</option>
              <option value="rooster">Rooster 🐓</option>
              <option value="dog">Dog 🐕</option>
              <option value="pig">Pig 🐖</option>
              <option value="ox">Ox 🐂</option>
              <option value="tiger">Tiger 🐅</option>
              <option value="rabbit">Rabbit 🐇</option>
              <option value="dragon">Dragon 🐉</option>
              <option value="snake">Snake 🐍</option>
              <option value="horse">Horse 🐎</option>
              <option value="monkey">Monkey 🐒</option>
            </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
                type="text"
                value={selectedfirst}
                onChange={(e) => updateSelectedfirst(e.target.value)}
                placeholder="Name of idol"
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
            />
            <input
                type="text"
                value={selectedfull}
                onChange={(e) => updateSelectedfull(e.target.value)}
                placeholder="Full name"
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
            />
            </div>
            </div>
            {/* Replace the button with NavLink */}
            
            <NavLink
              to={`/todayluck?sign=${selectedname1},${selectedname2},${selectedname3},${selectedfirst},${selectedfull}`}
              className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              // Disable the NavLink if no option is selected
              disabled={!selectedname1 || !selectedname2 || !selectedname3}
            >
              Luck and Love
            </NavLink>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Name;
