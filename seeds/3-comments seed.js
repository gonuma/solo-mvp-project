exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        {
          song_id: 1,
          comment: "first",
        },
        {
          song_id: 2,
          comment: "This song stinks",
        },
        {
          song_id: 2,
          comment: "I love this song",
        },
        {
          song_id: 3,
          comment: "Nice",
        },
      ]);
    });
};
