require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_PAGES_ID } = process.env

module.exports = async () => {
  console.log("content fetch cards")
  return await fetchCards(TRELLO_PAGES_ID)
}
