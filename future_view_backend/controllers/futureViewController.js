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

  // let firstValue = jsonData[1][12]
  // console.log(firstValue);

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
  const zodiacs = req.query.zodiac.split(',');// Using query parameter instead 
  let zodiac1, zodiac2;
  for (let i = 0; i < zodiacs.length; i++) {
    if (i===0) {
       zodiac1 = zodiacs[i];
    }
    if (i===1) {
       zodiac2 = zodiacs[i];
    }
  }

  console.log(zodiac1); // Convert to lowercase for case-insensitivity
  console.log(zodiac2); // Convert to lowercase for case-insensitivity

  const excelFilePath = "db/file.xlsx";
  const sheetIndex = 7; // Replace with the actual sheet index
  const sheetIndexmonth = 6; // Replace with the actual sheet index
  const sheetIndex2 = 0; // Replace with the actual sheet index

  // Load workbook with cellDates option
  const workbook = xlsx.readFile(excelFilePath, { cellDates: true });

  // Get the sheet name based on the provided sheet index
  const sheetName = workbook.SheetNames[sheetIndex];
  const sheetNamemonth = workbook.SheetNames[sheetIndexmonth];
  const sheetName2 = workbook.SheetNames[sheetIndex2];

  // Assuming you want data from the specified sheet
  const worksheet = workbook.Sheets[sheetName];
  const worksheetmonth = workbook.Sheets[sheetNamemonth];
  const worksheet2 = workbook.Sheets[sheetName2];

  // Convert the worksheet to JSON
  const jsonyears = xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
  });

  const jsonmonths = xlsx.utils.sheet_to_json(worksheetmonth, {
    header: 1,
    raw: false,
  });

  const jsonData2 = xlsx.utils.sheet_to_json(worksheet2, {
    header: 1,
    raw: false,
  });

  const relationshipraws = jsonData2.map((row) => row.slice(0, 3).map(item => item.toLowerCase()));
  // console.log(relationshipraws);
  const yaers = jsonyears.map((row) => row.slice(0, 2).map(item => item.toLowerCase()));
  // console.log(yaers);
  const months = jsonmonths.map((row) => row.slice(0, 2).map(item => item.toLowerCase()));
  // console.log(months);
  
  const yearrows = jsonyears
  .filter((row) => relationshipraws.some(rel => rel[0] === zodiac1 && rel[1] === row[0] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')) )
  .map((row) => row.slice(0, 2));
  
  

  const monthrows = jsonmonths
  .filter((row) => relationshipraws.some(rel => rel[0] === zodiac2 && rel[1] === row[0] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')) )
  .map((row) => row.slice(0, 2));
  
  // res.json({ yearrows, monthrows });

  const zodiacDates = {};

  // Group dates by zodiac sign
  yearrows.forEach(([zodia, date]) => {
    if (!zodiacDates[zodia]) {
      zodiacDates[zodia] = [];
    }
    zodiacDates[zodia].push(date);
  });
  
  // Convert the grouped dates into the desired format
  const formattedData = Object.entries(zodiacDates).map(([zodia, dates]) => {
    return [zodia, dates.join(", ")];
  });
  
  console.log(formattedData);

  res.json(formattedData);
});


router.get("/birthdays2", (req, res) => {
  const zodiacs = req.query.zodiac.split(',');// Using query parameter instead 
  let zodiac1, zodiac2;
  for (let i = 0; i < zodiacs.length; i++) {
    if (i===0) {
       zodiac1 = zodiacs[i];
    }
    if (i===1) {
       zodiac2 = zodiacs[i];
    }
  }

  console.log(zodiac1); // Convert to lowercase for case-insensitivity
  console.log(zodiac2); // Convert to lowercase for case-insensitivity

  const excelFilePath = "db/file.xlsx";
  const sheetIndex = 7; // Replace with the actual sheet index
  const sheetIndexmonth = 6; // Replace with the actual sheet index
  const sheetIndex2 = 0; // Replace with the actual sheet index

  // Load workbook with cellDates option
  const workbook = xlsx.readFile(excelFilePath, { cellDates: true });

  // Get the sheet name based on the provided sheet index
  const sheetName = workbook.SheetNames[sheetIndex];
  const sheetNamemonth = workbook.SheetNames[sheetIndexmonth];
  const sheetName2 = workbook.SheetNames[sheetIndex2];

  // Assuming you want data from the specified sheet
  const worksheet = workbook.Sheets[sheetName];
  const worksheetmonth = workbook.Sheets[sheetNamemonth];
  const worksheet2 = workbook.Sheets[sheetName2];

  // Convert the worksheet to JSON
  const jsonyears = xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
  });

  const jsonmonths = xlsx.utils.sheet_to_json(worksheetmonth, {
    header: 1,
    raw: false,
  });

  const jsonData2 = xlsx.utils.sheet_to_json(worksheet2, {
    header: 1,
    raw: false,
  });

  const relationshipraws = jsonData2.map((row) => row.slice(0, 3).map(item => item.toLowerCase()));
  // console.log(relationshipraws);
  const yaers = jsonyears.map((row) => row.slice(0, 2).map(item => item.toLowerCase()));
  // console.log(yaers);
  const months = jsonmonths.map((row) => row.slice(0, 2).map(item => item.toLowerCase()));
  // console.log(months);
  
  
  

  const monthrows = jsonmonths
  .filter((row) => relationshipraws.some(rel => rel[0] === zodiac2 && rel[1] === row[0] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')) )
  .map((row) => row.slice(0, 2));
  
  // res.json({ yearrows, monthrows });

  const zodiacDates = {};

  // Group dates by zodiac sign
  monthrows.forEach(([zodia, date]) => {
    if (!zodiacDates[zodia]) {
      zodiacDates[zodia] = [];
    }
    zodiacDates[zodia].push(date);
  });
  
  // Convert the grouped dates into the desired format
  const formattedData = Object.entries(zodiacDates).map(([zodia, dates]) => {
    return [zodia, dates.join(", ")];
  });
  
  console.log(formattedData);

  res.json(formattedData);
});

router.get("/next60", (req, res) => {
  const zodiacs = req.query.zodiac.split(',');// Using query parameter instead 
  let zodiac1, zodiac2;
  for (let i = 0; i < zodiacs.length; i++) {
    if (i===0) {
       zodiac1 = zodiacs[i];
    }
    if (i===1) {
       zodiac2 = zodiacs[i];
    }
  }

  console.log(zodiac1); // Convert to lowercase for case-insensitivity
  console.log(zodiac2); // Convert to lowercase for case-insensitivity

  const excelFilePath = "db/file.xlsx";
  const sheetIndex = 1; // Replace with the actual sheet inde
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
  const jsonyears = xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
  });

  const jsonmonths = xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
  });

  const jsonData2 = xlsx.utils.sheet_to_json(worksheet2, {
    header: 1,
    raw: false,
  });

  const relationshipraws = jsonData2.map((row) => row.slice(0, 3).map(item => item.toLowerCase()));
  console.log(relationshipraws);
  const yaers = jsonyears.map((row) => row.slice(1, 3).map(item => item.toLowerCase()));
  console.log(yaers);
  const months = jsonmonths.map((row) => row.slice(4, 6).map(item => item.toLowerCase()));
  console.log(months);
  const filteredyaers = yaers.filter(([animal, year]) => animal && year);
  const filteredmonth = months.filter(([animal, year]) => animal && year);

  const isNotDragonYear = arr => !(arr[0] === 'dragon' && arr[1] === 'year');
  const isNotDragonYear2 = arr => !(arr[0] === 'ox' && arr[1] === 'month');

// Use filter to remove the specific array
  const years2 = filteredyaers.filter(isNotDragonYear);
  const month2 = filteredmonth.filter(isNotDragonYear2);
  console.log(years2);
  console.log(month2);

  
  const result = years2.map(([animal, year]) => {
    let status = 'moderate';  
    const relationship = relationshipraws.find(
      ([animal1, animal2]) => animal1 === zodiac1 && animal2 === animal
    );

    if (relationship) {
      if (
        relationship[2].includes('soulmates') ||
        relationship[2].includes('supernatural soulmates') ||
        relationship[2].includes('soulmates for rabbit'))  
      {
        status = 'good';
      } else if (relationship[2].includes('enemies')) {
        status = 'bad';
      } else if (relationship[2].includes('unproductive')) {
        status = 'unproductive';
      } else if (relationship[2].includes('fun')) {
        status = 'fun';
      }
    }
  
    return [year, status];
  });
  console.log(result);
  
  // const monthrows = jsonmonths
  // .filter((row) => relationshipraws.some(rel => rel[0] === zodiac2 && rel[1] === row[0] && (rel[2] === 'soulmates' || rel[2] === 'supernatural soulmates' ||  rel[2] === 'soulmates for rabbit')) )
  // .map((row) => row.slice(0, 2));
  
  const result2 = month2.map(([animal, year]) => {
    let status = 'moderate';  
    const relationship = relationshipraws.find(
      ([animal1, animal2]) => animal1 === zodiac2 && animal2 === animal
    );

    if (relationship) {
      if (
        relationship[2].includes('soulmates') ||
        relationship[2].includes('supernatural soulmates') ||
        relationship[2].includes('soulmates for rabbit'))  
      {
        status = 'good';
      } else if (relationship[2].includes('enemies')) {
        status = 'bad';
      } else if (relationship[2].includes('unproductive')) {
        status = 'unproductive';
      } else if (relationship[2].includes('fun')) {
        status = 'fun';
      }
    }
  
    return [year, status];
  });
  

  const joinedData = [];

  for (let i = 0; i < result.length; i++) {
    joinedData.push([...result[i], ...result2[i]]);
  }
  
  res.json(joinedData);

});
 

router.get("/today", (req, res) => {
  const zodiacs = req.query.zodiac.split(',');// Using query parameter instead 
  console.log(zodiacs.length);
  console.log(zodiacs);
  let zodiac1, zodiac2, zodiac3, name, full;
  
  for (let i = 0; i < zodiacs.length; i++) {
    if (zodiacs[i] === '' || zodiacs[i] === ' ' || zodiacs[i] === 'undefined' || zodiacs[i] === undefined || zodiacs[i] === 'null' || zodiacs[i] === null) {
      zodiacs[i] = null;
    }
    if (i===0) {
       zodiac1 = zodiacs[i];
    }
    if (i===1) {
       zodiac2 = zodiacs[i];
    } 
    if (i===2) {
       zodiac3 = zodiacs[i];
    }
    if (i===3) {
       name = zodiacs[i];
    } 
    if (i===4) {
       full = zodiacs[i];
    } 
  }

  if (zodiacs.length === 4) {
  full = null;
  }
  
  console.log(zodiac1); // Convert to lowercase for case-insensitivity
  console.log(zodiac2); // Convert to lowercase for case-insensitivity
  console.log(zodiac3); // Convert to lowercase for case-insensitivity
  console.log(name); // Convert to lowercase for case-insensitivity
  console.log(full); // Convert to lowercase for case-insensitivity

  const excelFilePath = "db/file.xlsx";
  const sheetIndex = 2; // Replace with the actual sheet index
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
  // console.log(relationshipraws);


  const zodiacyear = 12
  const zodiacmonth = 13
  const zodiacday = 14

  // let firstValue = jsonData[1][12]
  // console.log(firstValue);

  // Filter rows where the value in the zodiac column is "Soulmates"
  const soulmateRows = jsonData
  .map((row) => row.slice(1, 8));
  const soulmateanimals = jsonData
  .map((row) => row.slice(12, 15));
  // Include columns A to G (index 0 to 6)
  const isNotDragonYear = arr => !(arr[4] === 'dob');
  const isNotDragonYear2 = arr => !(arr[0] === 'year animal' && arr[1] === 'month animal' && arr[2] === 'day animal');

// Use filter to remove the specific array
  const soulmateRows2 = soulmateRows.filter(isNotDragonYear);
  const soulmateanimals2 = soulmateanimals.filter(isNotDragonYear2);

  const filteredsoul = soulmateRows2.filter(([a, b, c, d, e, f]) => a || b || c || d || e || f);
  const filteredanimal = soulmateanimals2.filter(([y,m,d]) =>  y && m && d);
  
  
  

  const result = filteredanimal.map(([year, month, day]) => {
    let status = 'moderate';  
    let status2 = 'moderate';  
    let status3 = 'moderate';  
   
    const relationship = relationshipraws.find(
      ([animal1, animal2]) => animal1 === zodiac1 && animal2 === year
    );

    const relationship2 = relationshipraws.find(
      ([animal1, animal2]) => animal1 === zodiac2 && animal2 === month
    );
    
    const relationship3 = relationshipraws.find(
      ([animal1, animal2]) => animal1 === zodiac3 && animal2 === day
    );

    if (relationship) {
      
      if (
        relationship[2].includes('soulmates') ||
        relationship[2].includes('supernatural soulmates') ||
        relationship[2].includes('soulmates for rabbit') ||
        relationship[2].includes('powerteam with rooster') ||
        relationship[2].includes('powerteam with monkey') ||
        relationship[2].includes('powerteam with goat')
        )  
      {
        status = 'good';
      }
       else if (relationship[2].includes('enemies')) {
        status = 'bad';
      } 
    }
  
    if (relationship2) {
      if (
        relationship2[2].includes('soulmates') ||
        relationship2[2].includes('supernatural soulmates') ||
        relationship2[2].includes('soulmates for rabbit') ||
        relationship2[2].includes('powerteam with rooster') ||
        relationship2[2].includes('powerteam with monkey') ||
        relationship2[2].includes('powerteam with goat'))  
      {
        status2 = 'good';
      }
      else if (relationship2[2].includes('enemies')) {
        status2 = 'bad';
      } 
    }

    if (relationship3) {
      if (
        relationship3[2].includes('soulmates') ||
        relationship3[2].includes('supernatural soulmates') ||
        relationship3[2].includes('soulmates for rabbit') ||
        relationship3[2].includes('powerteam with rooster') ||
        relationship3[2].includes('powerteam with monkey') ||
        relationship3[2].includes('powerteam with goat')
      ) {
        status3 = 'good';
      }
      else if (relationship3[2].includes('enemies')) {
        status3 = 'bad';
      } 
    }

    a = 0
    b = 0
    c = 0
    if (status === 'good') {
      a = 1
    } else if (status === 'bad') {
      a = -1
    } 

    if (status2 === 'good') {
      b = 1
    } else if (status2 === 'bad') {
      b = -1
    }

    if (status3 === 'good') {
      c = 1
    }
    else if (status3 === 'bad') {
      c = -1
    }

  let sum = 'moderate';
  let sum2 = a + b + c;
   if (sum2 === 3) {
    sum = 'wonderful';
  } else if (sum2 === 2) {
    sum = 'very good';
  } else if (sum2 === 1) {
    sum = 'good';
  } else if (sum2 === 0) {
    sum = 'moderate';
  } else if (sum2 === -1) {
    sum = 'bad';
  } else if (sum2 === -2) {
    sum = 'very bad';
  } else if (sum2 === -3) {
    sum = 'terrible';
  }

    return [status, status2, status3, sum];
  });
 

  const joinedData = [];

  for (let i = 0; i < filteredsoul.length; i++) {
    joinedData.push([...filteredsoul[i], ...result[i]]);
  }

  if (!(name === null) && !(full === null)) {
   const repu = joinedData.filter(arr => {
      let name1 = arr[0];
      let fullName1 = arr[1];
      if (name1) name1 = name1.toLowerCase();
      if (fullName1) fullName1 = fullName1.toLowerCase();
      return name1 === name || fullName1 === full;
    });
  
  if (repu.length > 0) {
    res.json(repu);
  } else {
    res.status(404).json({
      message: `Idols not found for the specified names: "${name}", "${full}"`,
    });
  }

  } else if (!(name === null) && full === null) {
    const repu = joinedData.filter(arr => {
      let name1 = arr[0];
      if (name1) name1 = name1.toLowerCase();
      return name1 === name;
    });

    if (repu.length > 0) {
      res.json(repu);
    } else {
      res.status(404).json({
        message: `Idols not found for the specified names: "${name}", "${full}"`,
      });
    }

  } else if (name === null && !(full === null)) {
    const repu = joinedData.filter(arr => {
      let fullName1 = arr[1];
      if (fullName1) fullName1 = fullName1.toLowerCase();
      return fullName1 === full;
    });
    
    if (repu.length > 0) {
      res.json(repu);
    } else {
      res.status(404).json({
        message: `Idols not found for the specified names: "${name}", "${full}"`,
      });
    }

  } else {
    res.json(joinedData);
  }

  

  });

module.exports = router;
