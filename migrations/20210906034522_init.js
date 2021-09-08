exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id", { primaryKey: true }).notNullable().unique();

    table.string("username").notNullable();
  });

  await knex.schema.createTable("songs", (table) => {
    table.increments("id", { primaryKey: true }).notNullable().unique();

    table.string("band_name").notNullable();

    table.string("song_name").notNullable().unique();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("comments", (table) => {
    table.increments("id", { primaryKey: true });

    table
      .string("song_name", { deferrable: "deferred" })
      .references("songs.song_name")
      .onDelete("CASCADE");

    table.string("comment");
  });
};

exports.down = function (knex) {};
