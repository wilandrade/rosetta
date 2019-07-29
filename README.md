# Rosetta #
> A Japanese-English Sentences API

# Tech Used #
<img src="https://cdn-images-1.medium.com/max/1000/1*IvCDlfi3vQfgyKO1eFv4jA.png" alt="graphql" width="200">
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" alt="nodejs" width="200">

## Summary ##
  > Rosetta is a one stop shop to find EN-JP sentence translations. Just write your query, using the super simple and user-friendly GraphQL API, and get hundreds of sentences. With many more to come.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> 1) Send GraphQL query to localhost:3000/api
> 2) Visit localhost:3000/ to see landing page
> 3) Customize the query so that you only get the data you need
> 4) Create new sentences and share with the community 

### Queries
> Sentences: [Sentence]!
```
{
  Sentences {
    id
    jp_text
    en_text
    tag
  }
}

```
> GetSentencesByTag(tag: String): [Sentence]!
```
{
  GetSentencesByTag(tag:"Intermediate") {
    id
    jp_text
    en_text
    tag
  }
}
```
### Mutations
> CreateSentence(newSentence: SentenceInput): Sentence
```
mutation {
  CreateSentence(newSentence:{
    username:"Wil"
    en_text: "Is that so."
    jp_text: "そうか"
    tag: "Lame Phrases"
    secret: "I see dead people"
  }) {
    id
    en_text
    jp_text
  }
}
```
> DeleteSentence(id: Int): Sentence
```
mutation {
  DeleteSentence(id:12) {
    id
  }
}
```
> UpVote(id: Int): Sentence
```
mutation {
  UpVote(id: 1) {
    en_text
    jp_text
    points
  }
}
```
> DownVote(id: Int): Sentence
```
mutation {
  DownVote(id: 1) {
    en_text
    jp_text
    points
  }
}
```


## Development

### Requirements

- Node.js
- Postgres

### Installing Dependencies

> yarn 


### Run the app locally

>Start Postgres

>Make sure to create a Database called 'rosetta'

> Run migrations
```yarn migrate```

> Open browser at: http://localhost:3000/api to checkout the API's docs. 

> For more info on how to use the API, please consult GraphQL's docs

## Author

  - Wil Andrade

