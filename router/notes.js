const noteRoute = require("express").Router();
const { uuid } = require("../lib/helper");
const fs = require("fs");

noteRoute.get("/", (req, res) => {
  fs.readFile("db/db.json", "utf8", (error, data) =>
    error ? console.error(error) : res.status(200).json(JSON.parse(data))
  );
});

noteRoute.post("/", (req, res) => {
  const db = require("../db/db.json");

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uuid(),
      title: title,
      text: text,
    };

    const status = {
      status: "success",
      note: newNote,
    };

    db.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(db, null, 4), (err) => {
      err ? console.error(err) : res.status(200).json(status);
    });
  }
});

noteRoute.delete("/:id", (req, res) => {
  const notes = require("../db/db.json");

  var updatedList = [];

  notes.forEach((note) => {
    note.id !== req.params.id && updatedList.push(note);
  });

  fs.writeFile("db/db.json", JSON.stringify(updatedList, null, 4), (err) => {
    err
      ? console.error(err)
      : res.status(200).json(`The note ${req.params.id} is deleted.`);
  });
});

module.exports = noteRoute;
