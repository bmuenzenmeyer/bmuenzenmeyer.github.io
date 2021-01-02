// Get any environment variables we need
require("dotenv").config()
const {
  TRELLO_HOME_LIST_ID,
  TRELLO_TOKEN,
  TRELLO_KEY,
  NETLIFY_HOOK,
} = process.env

const fetch = require("node-fetch")

const body = {
  description: "Netlify build hook",
  callbackURL: NETLIFY_HOOK,
  idModel: TRELLO_HOME_LIST_ID,
}

fetch(
  `https://api.trello.com/1/tokens/${TRELLO_TOKEN}/webhooks/?key=${TRELLO_KEY}`,
  {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }
)
  .then((res) => res.json())
  .then((json) => console.log(json))
