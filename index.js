const config = require("./config");
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const express = require("express");
const graphHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Sentence {
    username: String!
    en_text: String!
    jp_text: String
    tag: String
    points: Int
  }

  input SentenceInput {
    username: String!
    en_text: String!
    jp_text: String
    tag: String
    point: Int
    secret: String!
  }

  type Query {
    Sentences: [Sentence]!
    GetSentencesByTag(tag:String): [Sentence]!
  }

  type Mutation {
    CreateSentence(newSentence: SentenceInput): Sentence
  }
`);

const root = {
  Sentences: () => {
    const sentences = models.sentences.list();
    return sentences;
  },
  GetSentencesByTag: req => {
    const sentences = models.sentences.list();
    return sentences.filter(sentence => sentence.tag === req.tag);
  },
  CreateSentence: req => {
    console.log(req);
    if (req.newSentence.secret === "I see dead people") {
      const sentence = models.sentences.create(req.newSentence);
      return sentence;
    } else return null;
  }
};

const app = express();
app.use(
  "/api",
  graphHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(config.express.port, () => {
  console.log(
    `Running a GraphQL API server at localhost:${config.express.port}/api`
  );
});
