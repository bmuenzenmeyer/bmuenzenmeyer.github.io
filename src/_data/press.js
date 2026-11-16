/**
 * Press, talks, podcasts, and other media appearances.
 *
 * Add new entries anywhere in this list — they are sorted (newest first)
 * and grouped by year automatically. Entries in the same month keep the
 * order they are written in here.
 *
 * Fields:
 *   date     (required) "YYYY-MM"
 *   kind     (required) Talk | Podcast | Post | Book | Screencast | Workshop | ...
 *   title    (required) the name of the talk / episode / article
 *   url      (required) primary link
 *   venue    (optional) where it appeared; links to `url`. If omitted, the title links to `url` instead.
 *   byline   (optional) e.g. "by Brad Frost"
 *   featured (optional) true to highlight the entry
 *   links    (optional) extra links, e.g. [{ label: "Video", url: "..." }]
 */
const entries = [
  {
    date: "2026-11",
    kind: "Post",
    venue: "InfoQ",
    url: "https://www.infoq.com/news/2026/11/nodejs-debounce-throttle/",
    title: "Node.js Brings Debounce, Throttle, and PKCS#12 Parsing into Core Modules",
  },
  {
    date: "2026-10",
    kind: "Talk",
    venue: "Node.js Collaboration Summit, Bologna",
    url: "https://github.com/openjs-foundation/summit/issues/511",
    title: "Moderation Roundtable and Proposal Review",
  },
  {
    date: "2026-09",
    kind: "Talk",
    venue: "Node Conf EU 2026",
    url: "https://nodeconf.eu/2026/program",
    title: "Replacing What Works: doc-kit and the Next 10 Years of Node.js Documentation",
    links: [{ label: "Video", url: "https://www.youtube.com/watch?v=GJbhYjjoujU&t=0s" }],
  },
  {
    date: "2026-08",
    kind: "Talk",
    venue: "Node.js Interactive at RenderATL",
    url: "https://openjsf.org/blog/node-interactive-speakers-2026",
    title: "Replacing What Works: doc-kit and the Next 10 Years of Node.js Documentation",
  },
  {
    date: "2026-08",
    kind: "Podcast",
    venue: "Talking Drupal",
    url: "https://talkingdrupal.com/564",
    title: "Approachable Open Source",
  },
  {
    date: "2026-07",
    kind: "Podcast",
    venue: "We ❤️ Open Source",
    url: "https://allthingsopen.org/articles/ai-like-tnt-github-agent-mode-permission-contribute",
    title: "Think of AI like TNT, not magic",
  },
  {
    date: "2026-05",
    kind: "Podcast",
    venue: "Software Engineering Daily",
    url: "https://softwareengineeringdaily.com/2026/05/14/open-source-sustainability/",
    title: "Open Source Sustainability",
  },
  {
    date: "2025-10",
    kind: "Talk",
    venue: "JSConf",
    url: "https://openjsf.org/blog/jsconf-25-speakers-announced",
    title: "Node.js - You Don't Need a Dependency",
    links: [{ label: "Video", url: "https://youtu.be/hRxSvDbvnaI?si=EevVzSUzbGBfOslx" }],
  },
  {
    date: "2025-10",
    kind: "Talk",
    venue: "All Things Open",
    url: "https://2025.allthingsopen.org/sessions/finite-source-machines-contribution-for-busy-humans",
    title: "Finite Source Machines: Contribution for Busy Humans",
    links: [{ label: "Slides", url: "https://approachableopensource.com/blog/2025-open-source-workshops/" }],
  },
  {
    date: "2025-09",
    kind: "Talk",
    venue: "JavaScript MN",
    url: "https://www.meetup.com/javascriptmn/events/309201511/",
    title: "Node.js - You Don't Need a Dependency",
  },
  {
    date: "2025-05",
    kind: "Talk",
    venue: "Minnebar",
    url: "https://sessions.minnestar.org/sessions/1812",
    title: "Do I still need this dependency for my Node.js app?",
  },
  {
    date: "2025-01",
    kind: "Podcast",
    venue: "Sustain OSS",
    url: "https://podcast.sustainoss.org/262",
    title: "Approachable Open Source",
  },
  {
    date: "2025-01",
    kind: "Podcast",
    venue: "Cloud Chat",
    url: "https://cloudchat.tech/2025/01/0017-the-source-is-with-us/",
    title: "Approachable Open Source",
  },
  {
    date: "2024-10",
    kind: "Podcast",
    venue: "Shoptalk Show",
    url: "https://shoptalkshow.com/637/",
    title: "Approachable Open Source",
  },
  {
    date: "2024-10",
    kind: "Book",
    url: "https://approachableopensource.com/",
    title: "Approachable Open Source",
    byline: "by Brian Muenzenmeyer",
    featured: true,
  },
  {
    date: "2024-03",
    kind: "Post",
    venue: "Node.js Blog",
    url: "https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign",
    title: "Diving into the Node.js Website Redesign",
  },
  {
    date: "2023-09",
    kind: "Talk",
    venue: "Node.js Collaborator Summit",
    url: "https://github.com/nodejs/admin/issues/830",
    title: "Triage and nodejs/help improvements",
  },
  {
    date: "2020-12",
    kind: "Post",
    venue: "CSS Tricks",
    url: "https://css-tricks.com/i-dont-know/",
    title: "I Don't Know",
  },
  {
    date: "2017-09",
    kind: "Book",
    url: "https://www.smashingmagazine.com/design-systems-book/",
    title: "Design Systems",
    byline: "by Alla Kholmatova",
  },
  {
    date: "2016-11",
    kind: "Book",
    url: "https://atomicdesign.bradfrost.com/",
    title: "Atomic Design",
    byline: "by Brad Frost",
  },
  {
    date: "2016-08",
    kind: "Screencast",
    venue: "CSS Tricks",
    url: "https://css-tricks.com/videos/149-quick-intro-pattern-lab-node-brian-muenzenmeyer/",
    title: "A Quick Intro to Pattern Lab Node",
  },
  {
    date: "2016-07",
    kind: "Post",
    venue: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/2016/07/building-maintaining-atomic-design-systems-pattern-lab/",
    title: "How To Make And Maintain Atomic Design Systems With Pattern Lab 2",
  },
  {
    date: "2016-06",
    kind: "Workshop",
    venue: "Web Design Day",
    url: "https://webdesignday.com/atomic-design-workshop.html",
    title: "Creating Atomic Design Systems With Pattern Lab",
  },
]

// ---------------------------------------------------------------------------
// Sorting + grouping. You shouldn't need to touch anything below this line.
// ---------------------------------------------------------------------------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const sorted = entries
  .map((entry, index) => {
    const [year, month] = entry.date.split("-")
    return { ...entry, index, year, month: MONTHS[Number(month) - 1] }
  })
  // newest first; ties keep authoring order
  .sort((a, b) => b.date.localeCompare(a.date) || a.index - b.index)

const years = []
for (const entry of sorted) {
  let group = years[years.length - 1]
  if (!group || group.year !== entry.year) {
    group = { year: entry.year, entries: [] }
    years.push(group)
  }
  group.entries.push(entry)
}

module.exports = { years, count: entries.length }
