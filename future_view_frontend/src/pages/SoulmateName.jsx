import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useAppContext } from "../main";
import { ToastContainer, toast } from 'react-toastify';

const handleShare = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      alert("URL copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy URL");
    });
};

const SoulmatesName = () => {
  const { selectedname1, selectedname2, selectedname3, selectedfirst, selectedfull } = useAppContext();
  const [soulmatesData, setSoulmatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
      const sign = params.get('sign');
      if (!sign) {
        throw new Error("Please select a zodiac sign!");
      }
      let [selectedname1, selectedname2, selectedname3, name, preparedSelectedFull] = sign.split(',');

      if (!selectedname1 || !selectedname2 || !selectedname3) {
        throw new Error("Please select a zodiac sign!");
      }
         name = selectedfirst.toLowerCase().trim();
         preparedSelectedFull = encodeURIComponent(selectedfull.toLowerCase().trim());
        // Make a GET request to the specified URL
        const apiUrl = `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/today?zodiac=${selectedname1},${selectedname2},${selectedname3},${name},${preparedSelectedFull}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
          
        const data = await response.json();
        // Handle the data received from the API
        console.log("Soulmates API response:", data);
        setSoulmatesData(data);
      } catch (error) {
        // Handle errors
        console.error("Idols not found:", error.message);
        setError(error.message);
      } finally {
        // Set loading to false after fetching is complete
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedname1, selectedname2, selectedname3]);

  if (loading) {
    return (
      <div>
        <Bars
          height="80"
          width="80"
          color="#1F2937"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    ); // You can replace this with a loader component
  }

  if (error) {
    alert(`Error: ${error}`);
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
    <button onClick={handleShare}>Share</button>
    <ToastContainer />
    {/* ...rest of your component... */}
  </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Full Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Korean Full Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Korean Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              DOB
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Other
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Country
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              year's luck
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              month's luck
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              day's luck
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              Overall luck
            </th>
          </tr>
        </thead>
        <tbody>
          {soulmatesData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 px-4 border-b border-gray-300 text-left text-gray-800"
                >
                  {cellData}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default SoulmatesName;
