require("dotenv").config({ path: "../.env" });

module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      `postgres://${process.env.USER}@127.0.0.1:5432/musispace`,
    migration: {
      tableName: "migrations",
      directory: "../migrations",
    },
    searchPath: "public",
    seeds: {
      directory: "../solo-mvp-project/seeds",
    },
    searchPath: "public",
  },
};
