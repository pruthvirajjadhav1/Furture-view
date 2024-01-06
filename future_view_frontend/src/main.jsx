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
  const [selectedname1, setSelectedname1] = useState("");
  const [selectedname2, setSelectedname2] = useState("");
  const [selectedname3, setSelectedname3] = useState("");
  const [selectedfirst, setSelectedfirst] = useState("");
  const [selectedfull, setSelectedfull] = useState("");
  const [selected601, setSelected601] = useState("");
  const [selected602, setSelected602] = useState("");
  const [selectedZodiacSignbirth1, setSelectedZodiacSignbirth1] = useState("");
  const [selectedZodiacSignbirth2, setSelectedZodiacSignbirth2] = useState("");

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
  const updateSelectedZodiacSignbirth1 = (sign) => {
    setSelectedZodiacSignbirth1(sign);
  };
  const updateSelectedZodiacSignbirth2 = (sign) => {
    setSelectedZodiacSignbirth2(sign);
  };
  const updateSelected601 = (sign) => { 
    setSelected601(sign);
  };
  const updateSelected602 = (sign) => { 
    setSelected602(sign);
  }
  const updateSelectedname1 = (sign) => {
    setSelectedname1(sign);
  }
  const updateSelectedname2 = (sign) => {
    setSelectedname2(sign);
  }
  const updateSelectedname3 = (sign) => {
    setSelectedname3(sign);
  }
  const updateSelectedfirst = (sign) => {
    setSelectedfirst(sign);
  }
  const updateSelectedfull = (sign) => {
    setSelectedfull(sign);
  }


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
    selectedZodiacSignbirth1,
    updateSelectedZodiacSignbirth1,
    selectedZodiacSignbirth2,
    updateSelectedZodiacSignbirth2,
    selected601,
    updateSelected601,
    selected602,
    updateSelected602,
    selectedname1,
    updateSelectedname1,
    selectedname2,
    updateSelectedname2,
    selectedname3,
    updateSelectedname3,
    selectedfirst,
    updateSelectedfirst,
    selectedfull,
    updateSelectedfull,
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
