require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_HOME_LIST_ID } = process.env

module.exports = () => {
  console.log("home fetch cards")
  return fetchCards(TRELLO_HOME_LIST_ID)
}
