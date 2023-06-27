const noteRoute = require("express").Router();
const { handleNotePost, handleNoteDelete } = require("../lib/helper");
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
      const { updatedNotes, status } = handleNotePost(notes, req.body);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(updatedNotes, null, 4),
        (err) => {
          err ? console.error(err) : res.status(200).json(status);
        }
      );
    }
  });
});

noteRoute.delete("/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const notes = JSON.parse(data);
      const updatedList = handleNoteDelete(notes, req.params.id);

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
