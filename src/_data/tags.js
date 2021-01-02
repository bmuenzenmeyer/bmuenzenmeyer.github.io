require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_PAGES_ID } = process.env

// todo, try to make cardsByTag an array of cards that have each grouping of tags?

const hasEntry = (cardsByTag, tag) => {
  // console.log({cardsByTag})
  // console.log({tag})
  return cardsByTag.find(entry => entry.name === tag)
}

module.exports = async () => {
  const cardsByTag = []
  const data = await fetchCards(TRELLO_PAGES_ID)
  // take these cards and create buckets based on the tag
  data.forEach((card) => {
    if (card.tags) {
      card.tags.forEach((tag) => {
        // console.log({ tag })
        if (!hasEntry(cardsByTag, tag)){
          // console.log(`adding new grouping for ${tag}`)
          cardsByTag.push({name: tag, cards: [card]})
        } else {
          // console.log(`adding to existing entry ${tag}`)
          const entry = cardsByTag.find(entry => entry.name === tag)
          // console.log()
          entry.cards.push(card)

        }
      })
    }
  })
  return cardsByTag
}
