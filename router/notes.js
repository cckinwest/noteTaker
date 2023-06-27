const noteRoute = require("express").Router();
const { uuid } = require("../lib/helper");
const fs = require("fs");

noteRoute.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (error, data) =>
    error ? console.error(error) : res.status(200).json(JSON.parse(data))
  );
});

noteRoute.post("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const notes = JSON.parse(data);
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

        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) => {
          err ? console.error(err) : res.status(200).json(status);
        });
      }
    }
  });
});

noteRoute.delete("/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const notes = JSON.parse(data);
      var updatedList = [];

      notes.forEach((note) => {
        note.id !== req.params.id && updatedList.push(note);
      });

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(updatedList, null, 4),
        (err) => {
          err
            ? console.error(err)
            : res.status(200).json(`The note ${req.params.id} is deleted.`);
        }
      );
    }
  });
});

module.exports = noteRoute;
