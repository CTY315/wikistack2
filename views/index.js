const layout = require("./layout");
const addPage = require("./addpage");
const editPage = require("./editpage");
const main = require("./main");
const userList = require("./userlist");
const userPages = require("./userpages");
const wikiPage = require("./wikipage");
const notFoundPage = require("./notFoundPage");
const searchTag = require("./searchTag");
const searverErrorPage = require("./serverErrorPage");

module.exports = {
  layout,
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
  notFoundPage,
  searverErrorPage,
};
