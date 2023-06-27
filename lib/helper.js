const fs = require("fs");

const getListOfId = () => {
  const notes = require("../db/db.json");

  var idList = [];

  notes.forEach((note) => {
    idList.push(note.id);
  });

  return idList;
};

const uuid = () => {
  const alphaList = "abcdefghijklmnopqrstuvwxyz".split("");
  const numList = "0123456789".split("");

  const first = alphaList[Math.floor(Math.random() * 26)];
  const second = alphaList[Math.floor(Math.random() * 26)];
  const third = numList[Math.floor(Math.random() * 10)];
  const fourth = numList[Math.floor(Math.random() * 10)];

  var idCreated = `${first}${second}${third}${fourth}`;

  if (getListOfId().includes(idCreated)) {
    return this.uuid();
  }

  return idCreated;
};

module.exports = { uuid };
