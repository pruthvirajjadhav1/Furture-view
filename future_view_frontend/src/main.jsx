import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create the provider component
export const AppProvider = ({ children }) => {
  // State to store previous context values
  const [previousContextValues, setPreviousContextValues] = useState({
    dob: "",
    fullname: "",
  });

  // State to store selected zodiac sign
  const [selectedZodiacSign, setSelectedZodiacSign] = useState("");
  const [selectedZodiacSign2, setSelectedZodiacSign2] = useState("");
  const [selectedZodiacSign3, setSelectedZodiacSign3] = useState("");

  // Update function for selected zodiac sign
  const updateSelectedZodiacSign = (sign) => {
    setSelectedZodiacSign(sign);
  };
  const updateSelectedZodiacSign2 = (sign) => {
    setSelectedZodiacSign2(sign);
  };
  const updateSelectedZodiacSign3 = (sign) => {
    setSelectedZodiacSign3(sign);
  };

  // Update function for previous context values
  const updatePreviousContextValues = ({ dob, fullname }) => {
    setPreviousContextValues({ dob, fullname });
  };

  // Context value
  const contextValue = {
    ...previousContextValues,
    selectedZodiacSign,
    updateSelectedZodiacSign,
    updatePreviousContextValues,
    selectedZodiacSign2,
    updateSelectedZodiacSign2,
    selectedZodiacSign3,
    updateSelectedZodiacSign3,
  };

  // Provide the context value to the children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Wrap the entire application with AppProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
