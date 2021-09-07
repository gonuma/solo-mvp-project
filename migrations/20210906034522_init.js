exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments("id", { primaryKey: true }).notNullable().unique();

      table.string("username").notNullable();
    }),

    knex.schema.createTable("songs", (table) => {
      table.increments("id", { primaryKey: true }).notNullable().unique();

      table.string("band_name").notNullable();

      table.string("song_name").notNullable();

      table.timestamp("created_at").defaultTo(knex.fn.now());
    }),

    knex.schema.createTable("comments", (table) => {
      table.increments("id", { primaryKey: true });

      table.integer("song_id").references("songs.id").onDelete("CASCADE");

      table.string("comment");
    }),
  ]);
};

exports.down = function (knex) {};
