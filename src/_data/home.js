require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_HOME_LIST_ID } = process.env

module.exports = () => {
  return fetchCards(TRELLO_HOME_LIST_ID)
}
