exports.up = function (knex) {
  return knex.schema.createTable("sentences", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("username")
      .index(); // index it

    t.text("en_text") // maximum length of 15 characters
      .notNullable()
      .unique() // add a unique constraint to this column
      .index(); // index it

    t.text("jp_text") // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .index(); // index it

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sentences");
};
