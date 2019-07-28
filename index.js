const config = require("./config");
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const express = require("express");
const graphHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const path = require("path");
const app = express();

const schema = buildSchema(`
  type Sentence {
    id: Int
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

  input SentenceUpdate {
    username: String
    en_text: String
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
    UpVote(id: Int): Sentence
    DownVote(id: Int): Sentence
    DeleteSentence(id: Int) : Sentence
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
    if (req.newSentence.secret === "I see dead people") {
      const sentence = models.sentences.create(req.newSentence);
      return sentence;
    } else return null;
  },
  UpVote: req => {
    const sentence = models.sentences.updateScoreById({
      id: req.id,
      point: 1
    });
    return sentence;
  },
  DownVote: req => {
    const sentence = models.sentences.updateScoreById({
      id: req.id,
      point: -1
    });
    return sentence;
  },
  DeleteSentence: req => {
    if (Object.keys(req).length) {
      const sentence = models.sentences.delete(req.id);
      return sentence;
    } else return null;
  }
};
app.use(
  "/api",
  graphHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "./views/")
  });
});
app.listen(config.express.port, () => {
  console.log(
    `Running a GraphQL API server at localhost:${config.express.port}/api`
  );
});
