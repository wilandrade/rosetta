exports.up = function(knex) {
  return knex.schema.createTable("sentences", t => {
    t.increments().index();

    t.string("username").notNullable(); //user who created sentence

    t.string("en_text")
      .notNullable()
      .unique(); // add a unique constraint to this column

    t.string("jp_text"); // add a unique constraint to this column;

    t.string("tag"); // tag that can be used optionally to group different sentences.

    t.integer("points"); //points a translation sentence has accrued

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("sentences");
};
