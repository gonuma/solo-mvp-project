require("dotenv").config({ path: "../.env" });
console.log(process.env.directory);

module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      `postgres://${process.env.USER}@127.0.0.1:5432/spotistats`,
    migration: {
      tableName: "migrations",
      directory: "../migrations",
    },
    searchPath: "public",
    seeds: {
      directory: "../solo-mvp/seeds",
    },
    searchPath: "public",
  },
};
