const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../db/k_pop.json");

const findSoulmate = (dob, callback) => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }

    try {
      const jsonData = JSON.parse(data);
      const soulmate = jsonData.find((artist) => artist.dob === dob);
      callback(null, soulmate);
    } catch (parseError) {
      callback(parseError);
    }
  });
};

const findArtistByDob = (dob, callback) => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }

    try {
      const jsonData = JSON.parse(data);
      const artist = jsonData.find((entry) => entry.dob === dob);
      callback(null, artist);
    } catch (parseError) {
      callback(parseError);
    }
  });
};

module.exports = {
  findSoulmate,
  findArtistByDob,
};
