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
          url: "k6EQAOmJrbw",
        },
        {
          band_name: "Nirvana",
          song_name: "Smells Like Teen Spirit",
          url: "hTWKbfoikeg",
        },
        {
          band_name: "Avenged Sevenfold",
          song_name: "Bat Country",
          url: "IHS3qJdxefY",
        },
        {
          band_name: "Skrillex",
          song_name: "Scary Monsters and Nice Sprites",
          url: "WSeNSzJ2-Jw",
        },
      ]);
    });
};
