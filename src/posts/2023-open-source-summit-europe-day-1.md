---
layout: item
title: Open Source Summit Europe Day 1
summary: Notes from a world away
date: 2023-09-19T07:00:59.452Z
tags:
  - opensource
  - post
---
> Open Source Summit EU in Bilbao, Spain : September 18th - September 21st

## Keynotes Day 1

This year's hot topics:

- OSS is a pillar for vertical industries' digital transformation
- OSS and the public sector... it's complicated
- value of open governance
- open source (and) sustainability
- open source AI

Open Source is not just about (big) tech. LF helps with networking, automotive, film, financial, energy, insurance, and agriculture. These verticals cannot achiever digital transformation without OSS.

Survey in EU OSS

- The business value of OSS is well understood, and the value is increasing. 
- 91% of respondents say it is CRITICAL
- AI is pushing everything. Foundation models are helping manage

### Networking News

- End to End OSS within networking. LF Connectivity. LF Edge. LF Networking.
- Sylva - open source telco cloud stack
- CAMARA - OSS API interoperability for telecoms

### Public Sector

- open source is the apolitical key, helps nations achieve their own digital sovereignty. prevents vendor lock-in
- but only 29% of the public sector contributes
- OSS can be a catalyst, but the perceived value has slowed
- CRA - Cyber Resilience Act
  - [explainer](https://devops.com/the-cyber-resilience-act-threatens-the-future-of-open-source/)
  - "(creating really angry) developers" 
  - ["Whitehouse calls for stronger open source security"](https://www.thestack.technology/white-house-open-source-security/)
  - as-is is part of the DNA of OSS
  - EU CRA upends the value exchange in open source
  - CRA puts liability on upstream projects
  - could block OSS work in the EU "not approved for use in the EU"
  - [linuxfoundation.eu/cyber-resilience-act](https://linuxfoundation.eu/cyber-resilience-act)

### Open Euler

https://www.openeuler.org/en/

> aside: https://en.wikipedia.org/wiki/Leonhard_Euler invented graph theory [Seven Bridges of Konigsberg](https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg) - OSS goals, be so impactful that people name projects after you. congrats tanstack.

- diversified computing. "OS platform." OS for all scenarios. cloud, edge, embedded
- expecting a 10-fold increase in computing demand by 2030
- improving computing power utilization and reducing power waste
- "with AI, for AI, by AI" 
- 2000 issues a day, 130 prs a day

### Open Wallet

- https://openwallet.foundation/
- Google and Microsoft joined OpenWallet
- "Enabling a trusted digital future through interoperability for a wide range of wallet use cases."
- android identity library. other companies

### OpenSearch

- 5 min lightning talk
- https://opensearch.org/
- journey of a project improving security. mature project, open source newbies
- diverse install base. tradeoffs between speed and access
- community feedback
- pre-disclosure list for vulnerabilities
- OpenSSF best practices - https://openssf.org/
- results. published CVEs. positive results and independent audit

### Thrive with Clean Code

- 5 min lightning talk
- > $2 trillion on bad code, tech debt, etc
- consistent. intentionlal. adoptible. responsible
- oh no. sonarcloud advertisement

### Keeping Open Open

- 5 min lightning talk
- CRA
- BSL
- open source means open. https://opensource.org/osd
- but its not enough. we need open governance.
- CNCF IP Charter
  - code cannot be relicensed. code cannot be withheld
- open participation. from BIG. CRA.... to SMALL. 

### The Evolving OSPO

- Nithya Ruff, OSPO at Amazon
- 2023 has been a challenging year
- 25 years of open source
- mainstream, pervasive
- OSS is now safe, predictable, manageable
- 5 challenges or opportunties
  - risk and innovation: doubt slows us down. organizations and humans dont like change. 
  - licenses
     - core foundation is OSI-approved licenses
     - dependable and understood. dont have to talk to your lawyer or procurement
     - social contract. like traffic lights
     - disruptive when new licenses muddy the definition
  - openish.
     - restrictive use cases
     - casts a shadow on the social contract
     - tries to defend business models. 
     - reactions
     - open enterprise association (centos)
     - OpenTF to host a fork of Terraform
  - AI is different than software
     - models. data. input. outputs. software.
     - OSI is trying to define open source AI
     - without this we are openish
     - we need this to improve access and reduce bias in AI
     - EU AI Act. Spain Build First AI Regulation Office
  - Open Source Security
     - complicated supply chain
     - producers, foundations, curators, consumer, public sector
     - Open Source Regulations. Executive Order in US. CRA in EU
  - Developer Experience
     - tools, libraries, ecosystems
     - OSPO reduces risk and reduces friction
     - build OSS into the workflow
- 5 takeaways
  - role of foundations as neutral parties
  - supply chain
  - standard def of AI
  - education and advocacy
  - make it easy to do open source 

---

lots of challenges. all eyes are on open source. its all of our jobs to educate our peers.

## Demonstrating OSPO Value

> A panel discussion on OSPO Metrics

- Chan Voong, Comcast
- Daniel Izquierdo, Bitergia
- Dawn Foster, CHAOSS
- David Hirsch, Dynatrace

https://chaoss.community/

### stakeholders

- all inclusive approach to stakeholders. go from developers all the way to the CTO. PMs. leadership. need to translate perspective to and from all
- sometimes we forget: biggest stakeholder is the "community" itself
- easy to get sucked in to legal, security, etc. we need to move beyond "just" that

### narrative from numbers to story, and vice-versa

- data to narrative. wall of dashboards that requires interpretation for different stakeholders. developer vs executive, based on the same data.
- different sets of data for different stakeholders. remind ourselves that we work for a company. its important to demonstrate worth. "flipside" to metrics, that help us maintain our OSPO
- "what is the most effective way to communicate to the person in front of me." contextualize the numbers
- know your audience.
- you dont even need the data. sometimes you only have the message. more impactful to have the pitch, and help that lead your data gathering efforts
- community metrics are sometimes arbitrary. have metrics that a related to other parts of the business. tie everything back.

### what are the tools you use to get data or create measurements?

- chaoss community software - https://chaoss.community/software/
- metrics, but also groups of them via [metrics models](https://chaoss.community/kbtopic/all-metrics-models/)
- [oss compass](https://oss-compass.org/)
- example: OSPOs that contribute to other business units

### what are some of the usecases for these tools?

- influence and impact
- data science. 

### Q&A

#### how did you grow from 8 to 30?

- ticketing system helped prove adoption and time saved
- how that impacts revenue

#### how do you keep people from gaming metrics?

- try to focus on metrics that, if gamed, are still good for the community
- centralize the measurement. anonymize it. 

#### we want to measure contributions without tying to performance?

- this is for only product management, not developer stuff

#### how do you educate teams to put extra effort into open source instead of the product model?

- compare to estimate
- do both and compare (not often done)
- try to explain upstream at a strategic level
- even so, some things dont have numbers
- it's a marathon

#### what metrics help at the executive level

- measure your dependencies
- measure those contributors
- consider how much it would take to build it ourselves
- what do executives care about? back into it that way
