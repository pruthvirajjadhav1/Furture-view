import React, { useEffect } from "react";

import GetData from "./GetData";
import Soulmates from "../components/Soulmates";

const Home = () => {
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-4">
      <Soulmates />

      <GetData
        title="2. Predicts Your 60 months of Luck and Love"
        page="/soulmate-name"
        button="predicts Luck"
      />
      <GetData
        title="3. Find Your Soulmates' Birthdates"
        page="/soulmate-birthday"
        button="Get birthdates"
      />
      <GetData
        title="4. Predicts Kpop Idols' Luck and Love Today"
        page="/soulmate-name"
        button="Luck and Love"
      />
    </div>
  );
};

export default Home;

// import React from "react";
// import { useAppContext } from "../main";
// import { NavLink } from "react-router-dom";

// const Home = () => {
//   const { dob, fullname, updateDob, updateFullname } = useAppContext();

//   const handleNameChange = (event) => {
//     updateFullname(event.target.value);
//   };

//   const handleDateOfBirthChange = (event) => {
//     updateDob(event.target.value);
//   };

//   const handleNextButtonClick = (event) => {
//     if (!fullname.trim() || !dob.trim()) {
//       alert("Please fill in all fields");
//     } else {
//       console.log("Fullname:", fullname);
//       console.log("Date of Birth:", dob);
//     }
//   };

//   return (
//     <section className="max-w-2xl p-8 mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-md shadow-md text-white">
//       <h2 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white mb-4">
//         Enter Your Details
//       </h2>

//       <form>
//         <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
//           <div>
//             <label
//               className="text-gray-700 dark:text-gray-200"
//               htmlFor="username"
//             >
//               Name
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={fullname}
//               onChange={handleNameChange}
//               className={`block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring placeholder-gray-400`}
//             />
//           </div>

//           <div>
//             <label
//               className="text-gray-700 dark:text-gray-200"
//               htmlFor="dateOfBirth"
//             >
//               Date of Birth
//             </label>
//             <input
//               id="dateOfBirth"
//               type="date"
//               value={dob}
//               onChange={handleDateOfBirthChange}
//               className={`block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring placeholder-gray-400`}
//               placeholder="YYYY-MM-DD"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mt-6">
//           <NavLink
//             to="/request"
//             className="flex items-center px-8 py-3 leading-5 text-white rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
//             onClick={handleNextButtonClick}
//           >
//             Next
//             <svg
//               className="w-5 h-5 ml-2"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </NavLink>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Home;
