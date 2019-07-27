exports.up = function(knex) {
  // create the 'sentences' table with three columns
  return knex.schema.createTable("sentences", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("username", 15) // maximum length of 15 characters
      .index(); // index it

    t.string("en_text", 15) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .index(); // index it

    t.string("jp_text", 15) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .index(); // index it

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
