require("dotenv").config()

module.exports = {
  name: "Brian Muenzenmeyer",
  permalink: "/:title",
  baseurl: "",
  host: new URL(process.env.URL || "https://localhost").host,
  trello_board: process.env.TRELLO_BOARD_URL,
}
