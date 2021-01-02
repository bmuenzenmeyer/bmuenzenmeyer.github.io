const fetch = require("node-fetch")

require("dotenv").config()

const {
  TRELLO_BOARD_ID,
  TRELLO_API_BOARD_CARDS,
  TRELLO_TOKEN,
  TRELLO_KEY,
  BRANCH,
} = process.env

const trelloBoardUrl = TRELLO_API_BOARD_CARDS.replace(
  "TRELLO_BOARD_ID",
  TRELLO_BOARD_ID
)

const extractProperty = (card, propName) => {
  const label = card.labels.filter((l) => {
    // console.log(20, l)
    return l.name.toLowerCase().startsWith(`${propName}:`)
  })

  // console.log(24, card.name, label, propName)

  if (label.length) {
    if (propName === "tag") {
      card[`tags`] = label.map(l => l.name.split(':')[1])
    } else {
      if (!card.tags) {
        card[`tags`] = []
      }
      card[`PANTOGRAPH_${propName}`] = label[0].name.split(":")[1]
    }
  }
  // console.log(35, card)
}

module.exports = (listID) => {
  // Fetch the JSON data about this board
  return fetch(`${trelloBoardUrl}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
    .then((res) => res.json())
    .then((json) => {
      // Just focus on the cards which are in the list we want
      // and do not have a closed status
      let contentCards = json.filter((card) => {
        return card.idList == listID && !card.closed
      })

      // only include cards labelled with "live" or with
      // the name of the branch we are in
      let contextCards = contentCards.filter((card) => {
        return card.labels.filter(
          (label) =>
            label.name.toLowerCase() == "live" ||
            label.name.toLowerCase() == BRANCH
        ).length
      })

      // If a card has an attachment, add it as an image in the description markdown
      contextCards.forEach((card) => {
        if (card.attachments && card.attachments.length) {
          card.name = ""
          card.desc =
            card.desc +
            `\n![${card.name}](${card.attachments[0].url} '${card.name}')`
        }

        extractProperty(card, "tag")
        extractProperty(card, "date")
      })

      // return our data
      return contextCards
    })
}
