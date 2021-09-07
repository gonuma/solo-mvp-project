require("dotenv").config({ path: "../.env" });

module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      `postgres://${process.env.USER}@127.0.0.1:5432/musispace`,
    migration: {
      tableName: "migrations",
      directory: (__dirname, "..", "migrations"),
    },
    searchPath: "public",
    seeds: {
      directory: (__dirname, "..", "seeds"),
    },
    searchPath: "public",
  },
};
