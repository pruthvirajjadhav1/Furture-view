import React, { useEffect, useState } from "react";
import { useAppContext } from "../main";
import { useNavigate } from "react-router-dom";

function formatDate(inputDate) {
  const parsedDate = new Date(inputDate);

  if (isNaN(parsedDate.getTime())) {
    // Invalid date format
    return "Invalid Date";
  }

  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${month}/${day}/${year}`;
}

const SoulmateName = () => {
  const { dob, fullname, updateDob, updateFullname } = useAppContext();
  const [soulmateData, setSoulmateData] = useState({ fullname: "", kname: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!dob) {
      alert("Please fill in your details!");
      navigate("/");
    }

    const fetchSoulmateData = async () => {
      try {
        const formattedDate = formatDate(dob);
        const apiUrl = `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/soulmate?dob=${formattedDate}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setSoulmateData(data);
        } else if (response.status === 404) {
          // Handle the case when soulmate data is not found
          console.error("Soulmate not found");
          setSoulmateData({ fullname: "Soulmate not found", kname: "" });
        } else {
          console.error(`Error fetching data: ${response.statusText}`);
          setSoulmateData({ fullname: "Error fetching data", kname: "" });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setSoulmateData({ fullname: "Error fetching data", kname: "" });
      }
    };

    if (dob) {
      fetchSoulmateData();
    }
  }, [dob, navigate]);

  return (
    <div className="max-w-2xl p-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg shadow-md text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Your K-Pop Soulmate</h2>
        <p className="text-5xl font-bold mb-6 ">{soulmateData.fullname}</p>
        <p className="text-2xl font-medium">{soulmateData.kname}</p>
      </div>
    </div>
  );
};

export default SoulmateName;
