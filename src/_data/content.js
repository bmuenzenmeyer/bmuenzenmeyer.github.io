require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_PAGES_ID } = process.env

module.exports = async () => {
  // const data = await fetchCards(TRELLO_PAGES_ID)
  // console.log(data)
  // return data
  return fetchCards(TRELLO_PAGES_ID)
}
