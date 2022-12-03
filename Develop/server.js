const express = require("express");
const path = require("path");
const fs = require("fs");

const termData = require("./db/db.json");

const PORT = process.env || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/paths", (req, res) =>
  res.sendFile(path.join(__dirname, "public/paths.html"))
);

app.get("/api/notes", (req, res) => res.json(termData));
app.post("/api/notes", (req, res) => {
  var newTermData = termData;
  newTermData.push(req.body);
  // PROBLEM: req.body doesn't exist. so I have to push blah blah's
  console.log(req.body);
  // newTermData.push(req.body);

  fs.writeFile("db/db.json", JSON.stringify(newTermData), (err) =>
    err ? console.error(err) : console.log("Success!")
  );

  res.json(termData);
  // res.json(newTermdata);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
