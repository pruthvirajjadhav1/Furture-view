import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetData from "./GetData";
import { useAppContext } from "../main";

const RequestPage = () => {
  const { dob, fullname, updateDob, updateFullname } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!dob) {
      alert("Please fill your details!");
      navigate("/");
      return;
    }
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <GetData
        title=" 1. Find Your K-Pop Idol Soulmate"
        page="/soulmate-name"
        button="soulmate name"
      />
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

export default RequestPage;
