import React, { useEffect, useState } from "react";
import { useAppContext } from "../main";

const formatDate = (inputDate) => {
  const parsedDate = new Date(inputDate);

  if (isNaN(parsedDate.getTime())) {
    // Invalid date format
    return "Invalid Date";
  }

  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${month}/${day}/${year}`;
};

const SoulmateBirthday = () => {
  const { dob, updateDob } = useAppContext();
  const [birthdateData, setBirthdateData] = useState({ fullname: "", dob: "" });

  useEffect(() => {
    const fetchBirthdateData = async () => {
      try {
        const apiUrl = `http://localhost:3000/api/birthday?dob=${formatDate(
          dob
        )}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(response);

        if (response.status === 404) {
          setBirthdateData({ fullname: "Birthday not found!", dob: "" });
        } else {
          setBirthdateData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (dob) {
      fetchBirthdateData();
    }
  }, [dob]);

  return (
    <div className="max-w-2xl p-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-md text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          Your K-Pop Soulmate's Birthdate
        </h2>
        <p className="text-5xl font-bold mb-6 ">{birthdateData.dob}</p>
        <p className="text-2xl font-medium">{birthdateData.fullname}</p>
      </div>
    </div>
  );
};

export default SoulmateBirthday;
