const moment = require("moment");

const Sentence = function(row) {
  console.log(row);
  this.id = row.id;
  this.username = row.username;
  this.en_text = row.en_text;
  this.jp_text = row.jp_text;
  this.tag = row.tag;
  this.points = row.points;
  this.created_at = new Date(row.created_at);
};

Sentence.prototype.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    en_text: this.en_text,
    jp_text: this.jp_text,
    tag: this.tag,
    points: this.points,
    created_at: moment(this.created_at).fromNow()
  };
};

module.exports = knex => {
  return {
    list: require("./list_sentences")(knex, Sentence),
    create: require("./create_sentences")(knex, Sentence)
  };
};
