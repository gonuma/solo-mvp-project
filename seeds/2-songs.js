exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        {
          id: 1,
          band_name: "My Chemical Romance",
          song_name: "Teenagers",
          // comment: "Perfect for brooding.",
        },
        {
          id: 2,
          band_name: "Nirvana",
          song_name: "Smells Like Teen Spirit",
          // comment: "I was born too late.",
        },
        {
          id: 3,
          band_name: "Avenged Sevenfold",
          song_name: "Bat Country",
        },
        {
          id: 4,
          band_name: "Skrillex",
          song_name: "Scary Monsters and Nice Sprites",
          // comment: "So deep",
        },
      ]);
    });
};
