exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        {
          band_name: "My Chemical Romance",
          song_name: "Teenagers",
          // comment: "Perfect for brooding.",
        },
        {
          band_name: "Nirvana",
          song_name: "Smells Like Teen Spirit",
          // comment: "I was born too late.",
        },
        {
          band_name: "Avenged Sevenfold",
          song_name: "Bat Country",
        },
        {
          band_name: "Skrillex",
          song_name: "Scary Monsters and Nice Sprites",
          // comment: "So deep",
        },
      ]);
    });
};
