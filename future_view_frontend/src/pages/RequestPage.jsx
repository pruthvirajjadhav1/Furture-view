import React, { useEffect, useState } from "react";
import { useAppContext } from "../main";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
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

const RequestPage = () => {
  const { selected601, selected602 } = useAppContext();
  const [soulmatesData2, setSoulmatesData2] = useState([]);
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
      let [selected601, selected602] = sign.split(',');
        if (!selected601 || !selected602) {
          throw new Error("Please select a zodiac sign!");
        }

        // Make a GET request to the specified URL
        const apiUrl2 = `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/next60?zodiac=${selected601},${selected602}`;

        const response2 = await fetch(apiUrl2);
        if (!response2.ok) {
          throw new Error(`Failed to fetch data. Status: ${response2.status}`);
        }
          
        const data2 = await response2.json();
        // Handle the data received from the API
        console.log("Soulmates API response:", data2);
        setSoulmatesData2(data2);


      } catch (error) {
        // Handle errors
        console.error("Error fetching soulmates data:", error.message);
        setError(error.message);
      } finally {
        // Set loading to false after fetching is complete
        setLoading(false);
      }
    };

    fetchData();
  }, [selected601, selected602]);

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
      <table className="w-full bg-white border border-gray-300">
     
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              years
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              predictions for year
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              months
            </th>
            <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left text-gray-800">
              predictions for month
            </th>
          </tr>
        </thead>
        <tbody>
          {soulmatesData2.map((rowData, rowIndex) => (
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

export default RequestPage;
