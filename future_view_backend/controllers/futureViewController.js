const express = require("express");
const router = express.Router();
const kpopModel = require("../models/kpopModels");

const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

router.get("/soulmates", (req, res) => {
  const zodiacs = req.query.zodiac.split(',');// Using query parameter instead 
  let zodiac1, zodiac2, zodiac3;
  for (let i = 0; i < zodiacs.length; i++) {
    if (i===0) {
       zodiac1 = zodiacs[i];
    }
    if (i===1) {
       zodiac2 = zodiacs[i];
    }
    if (i===2) {
       zodiac3 = zodiacs[i];
    }
  }
  console.log(zodiac1); // Convert to lowercase for case-insensitivity
  console.log(zodiac2); // Convert to lowercase for case-insensitivity
  console.log(zodiac3); // Convert to lowercase for case-insensitivity

  const excelFilePath = "db/file.xlsx";
  const sheetIndex = 3; // Replace with the actual sheet index
  const sheetIndex2 = 0; // Replace with the actual sheet index

  // Load workbook with cellDates option
  const workbook = xlsx.readFile(excelFilePath, { cellDates: true });

  // Get the sheet name based on the provided sheet index
  const sheetName = workbook.SheetNames[sheetIndex];
  const sheetName2 = workbook.SheetNames[sheetIndex2];

  // Assuming you want data from the specified sheet
  const worksheet = workbook.Sheets[sheetName];
  const worksheet2 = workbook.Sheets[sheetName2];

  // Convert the worksheet to JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
  });

  const jsonData2 = xlsx.utils.sheet_to_json(worksheet2, {
    header: 1,
    raw: false,
  });

  const relationshipraws = jsonData2.map((row) => row.slice(0, 3).map(item => item.toLowerCase()));
  console.log(relationshipraws);


  const zodiacyear = 12
  const zodiacmonth = 13
  const zodiacday = 14

  let firstValue = jsonData[1][12]
  console.log(firstValue);

  

  // Find the index of the zodiac column in the first row
  // const zodiacColumnIndex = jsonData[0]
  //   .map((col) => col.toLowerCase())
  //   .indexOf(zodiac1);

  // if (zodiacColumnIndex === -1) {
  //   return res.status(400).json({
  //     error: `Zodiac sign "${zodiac1}" not found in the Excel sheet`,
  //   });
  // }
  // console.log(zodiacColumnIndex);

  // Filter rows where the value in the zodiac column is "Soulmates"
  const soulmateRows = jsonData
  .filter((row) => relationshipraws.some(rel => rel[0] === zodiac1 && rel[1] === row[12] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')) || relationshipraws.some(rel => rel[0] === zodiac2 && rel[1] === row[13] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')) || relationshipraws.some(rel => rel[0] === zodiac3 && rel[1] === row[14] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')))
  .map((row) => row.slice(1, 8));
// Include columns A to G (index 0 to 6)

  if (soulmateRows.length > 0) {
    res.json(soulmateRows);
  } else {
    res.status(404).json({
      message: `Soulmates not found for the specified zodiac sign "${zodiac1}"`,
    });
  }
});

router.get("/birthdays", (req, res) => {
  const dob = req.query.dob;

  kpopModel.findArtistByDob(dob, (err, artist) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (artist && artist.fullname) {
      res.json({ fullname: artist.fullname, dob: artist.dob });
    } else {
      res.status(404).json({ message: "Birthdays not found!" });
    }
  });
});

module.exports = router;
