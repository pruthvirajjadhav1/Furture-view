import React from "react";
import { useAppContext } from "../main";
import { NavLink } from "react-router-dom";

const Next60 = () => {
  // Access the context using the custom hook
  const { selected601, updateSelected601 } = useAppContext();
  const { selected602, updateSelected602 } = useAppContext();

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform additional actions if needed
    // ...

    // Navigate to "/k-pop-soulmates" using the selected zodiac sign
    // You can adjust the URL structure based on your needs
    // Example: `/k-pop-soulmates/${selectedZodiacSign}`
    window.location.href = `/next60m?sign=${selected601},${selected602}`;
  };

  return (
    <section className="flex flex-col w-[900px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-col md:h-32">
  <div className="md:flex md:items-center md:justify-center md:w-full md:bg-gray-700">
    <div className="px-6 py-6 md:px-8 md:py-0">
      <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
        2. Predicts Your 60 months of Luck and Love
      </h2>
    </div>
  </div>

  <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit}>
    <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
   <select
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              name="zodiacSign"
              value={selected601}
              onChange={(e) => updateSelected601(e.target.value)}
              aria-label="Select your zodiac sign"
            >
              {/* Add an initial blank option */}
              <option value="" disabled hidden>
                Select your year sign
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
              value={selected602}
              onChange={(e) => updateSelected602(e.target.value)}
              aria-label="Select your zodiac sign"
            >
              {/* Add an initial blank option */}
              <option value="" disabled hidden>
                Select your month sign
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
            {/* Replace the button with NavLink */}
            
            <NavLink
              to={`/next60m?sign=${selected601},${selected602}`}
              className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              // Disable the NavLink if no option is selected
              disabled={!selected601 || !selected602}
            >
              Predicts Luck
            </NavLink>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Next60;
