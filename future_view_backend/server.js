const express = require("express");
const cors = require("cors");
const futureViewController = require("./controllers/futureViewController");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running🛠️" });
});

app.use("/api", futureViewController);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Check if the error is an instance of one of the built-in error classes
  if (err instanceof SyntaxError || err instanceof TypeError) {
    // Handle parsing or type errors (e.g., JSON parsing error)
    res.status(400).json({ error: "Bad Request" });
  } else {
    // Handle other types of errors with a generic 500 Internal Server Error response
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
