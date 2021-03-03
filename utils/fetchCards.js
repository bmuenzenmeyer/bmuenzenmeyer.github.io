const fetch = require("node-fetch")

require("dotenv").config()

const {
  TRELLO_BOARD_ID,
  TRELLO_API_ATTACHMENTS,
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
      card[`tags`] = label.map((l) => l.name.split(":")[1])
    } else {
      if (!card.tags) {
        card[`tags`] = []
      }
      card[`PANTOGRAPH_${propName}`] = label[0].name.split(":")[1]
    }
  }
  // console.log(35, card.name, card.tags)
}

const findImage = async (card) => {
  if (card.badges.attachments) {
    const trelloAttachmentsUrl = TRELLO_API_ATTACHMENTS.replace(
      "TRELLO_CARD_ID",
      card.id
    )

    const rawRes = await fetch(
      `${trelloAttachmentsUrl}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
    )

    const res = await rawRes.json()
    card.desc = card.desc + `\n![${card.name}](${res[0].url} '${card.name}')`
    card.PANTOGRAPH_IMAGE = res[0].url
    return card
  } else {
    return card
  }
}

module.exports = async (listID) => {
  // Fetch the JSON data about this board
  const response = await fetch(
    `${trelloBoardUrl}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
  )
  const json = await response.json()

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
        label.name.toLowerCase() == "live" || label.name.toLowerCase() == BRANCH
    ).length
  })
  const promises = contentCards.map(async (card) => {
    // If a card has an attachment, add it as an image in the description markdown
    card = await findImage(card)
    // extract properties off of trello labels like `tag:foo`
    extractProperty(card, "tag")
    extractProperty(card, "date")
    return card
  })

  const promisedCards = Promise.all(promises)

  // return our data
  return promisedCards
}
