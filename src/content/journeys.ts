import type { Journey } from "./types";

// Signature journeys are illustrative starting points, not bookable packages.
// No prices, inclusions or named properties are stated: those are confirmed
// only in a traveller's own proposal.

export const journeys: Journey[] = [
  {
    slug: "rainforest-to-the-pacific",
    title: "Rainforest to the Pacific",
    kicker: "A first journey through the country's classic landscapes",
    summary:
      "Volcano and hot springs, a few cool days in the cloud forest, then down to the coast where the forest meets the sea.",
    intro: [
      "If this is your first time in Costa Rica, this is the shape of trip we most often suggest as a starting point. It moves from the lowland rainforest around Arenal up into the cloud forest of Monteverde, then down to the Central Pacific, so you experience three quite different climates without spending your holiday in a car.",
      "The route is deliberately unhurried: two or three nights in each place, time built in for the drive between them, and space for rest as well as exploring.",
    ],
    destinations: ["arenal", "monteverde", "manuel-antonio"],
    image: "arenal",
    secondaryImage: "manuelAntonio",
    suggestedLength: "Around 10 to 12 nights",
    pace: "Balanced",
    idealFor: ["First visits", "Couples", "Families with children of most ages", "Wildlife and walking"],
    stages: [
      {
        place: "Arenal",
        stay: "3 nights",
        title: "Under the volcano",
        body: "Arrive in the northern lowlands and settle into the rhythm of the rainforest. Walk the old lava flows, cross the canopy on hanging bridges, and end each day in warm thermal water.",
      },
      {
        place: "Monteverde",
        stay: "2 to 3 nights",
        title: "Into the cloud",
        body: "Travel around the lake and climb into the Tilarán mountains. Mornings in the reserves with a naturalist, a night walk, and the cooler air of the continental divide.",
      },
      {
        place: "Central Pacific",
        stay: "4 nights",
        title: "Down to the coast",
        body: "Descend to the Pacific near Manuel Antonio. Guided time in the national park, mangroves by kayak, and long unplanned afternoons by the sea.",
      },
    ],
    experiences: [
      "Volcano trails and hanging bridges",
      "Hot springs",
      "Guided cloud forest walks by day and night",
      "Wildlife in Manuel Antonio National Park",
      "Kayaking in the mangroves",
    ],
    stays: {
      intro:
        "We match places to stay to the way you travel. On this route that might mean a lodge with views of the volcano, a small cloud forest hotel among the trees, and somewhere on the coast where the forest comes right to your terrace.",
      styles: ["Rainforest lodges", "Small boutique hotels", "Private villas on the coast"],
    },
    considerations: [
      "Road transfers between regions take a good part of the day; we build them into the plan rather than squeezing them in.",
      "Monteverde is noticeably cooler than the coast, so pack a warm layer.",
      "Manuel Antonio National Park manages daily visitor numbers and is not open every day, which we take into account when planning.",
    ],
    seoDescription:
      "A tailor-made Costa Rica itinerary idea for first-time visitors: Arenal, the Monteverde cloud forest and the Central Pacific coast, adapted to you.",
  },
  {
    slug: "volcanoes-and-cloud-forest",
    title: "Volcanoes and Cloud Forest",
    kicker: "Mountains, thermal water and highland walking",
    summary:
      "The volcanic north, from bubbling mud on Rincón de la Vieja to the pale blue Río Celeste, Arenal's cone and the cloud forest of Monteverde.",
    intro: [
      "This journey follows Costa Rica's volcanic spine through the north. It suits travellers who would happily trade a few beach days for more time on foot, in thermal water and in the cool green of the mountains.",
      "It can begin in Liberia or San José, and it ends easily on the Guanacaste coast if you want to finish with a few days by the sea.",
    ],
    destinations: ["guanacaste", "arenal", "monteverde"],
    image: "monteverde",
    secondaryImage: "river",
    suggestedLength: "Around 9 to 11 nights",
    pace: "Active, with room to rest",
    idealFor: ["Walkers", "Return visitors", "Photographers", "Travellers who prefer mountains to beaches"],
    stages: [
      {
        place: "Rincón de la Vieja",
        stay: "2 nights",
        title: "An active volcano",
        body: "Trails past fumaroles and mud pots, waterfalls in the dry forest, and evenings on the edge of the national park.",
      },
      {
        place: "Tenorio",
        stay: "2 nights",
        title: "The blue river",
        body: "Walk to the Río Celeste, where mineral-rich waters turn a striking pale blue, and stay somewhere quiet in the forest nearby.",
      },
      {
        place: "Arenal",
        stay: "3 nights",
        title: "The great cone",
        body: "Trails across old lava flows, a day on the river or in the canopy, and hot springs as the light fades.",
      },
      {
        place: "Monteverde",
        stay: "2 to 3 nights",
        title: "The cloud forest",
        body: "Finish high in the cloud forest, walking slowly with a naturalist and watching the mist roll through the canopy.",
      },
    ],
    experiences: [
      "Volcano walks and thermal mud",
      "The Río Celeste trail",
      "Hot springs",
      "Hanging bridges",
      "Birding in the cloud forest",
    ],
    stays: {
      intro:
        "Mostly smaller lodges in or near the forest, where you can walk from your door. In Arenal there are more choices, from secluded lodges to places built around hot springs.",
      styles: ["Forest lodges", "Hot-spring retreats", "Small mountain hotels"],
    },
    considerations: [
      "Some trails are steep and can be muddy; reasonable fitness makes this journey more enjoyable.",
      "The colour of the Río Celeste is at its clearest after dry weather and can cloud after heavy rain.",
      "Temperatures range from hot lowlands to cool highland nights within a few days.",
    ],
    seoDescription:
      "A tailor-made Costa Rica itinerary idea for walkers: Rincón de la Vieja, Río Celeste, Arenal and the Monteverde cloud forest.",
  },
  {
    slug: "the-wild-south",
    title: "The Wild South",
    kicker: "Remote rainforest, boats and the open Pacific",
    summary:
      "Whale coasts near Uvita, then on by boat to the Osa Peninsula and the deep forest of Corcovado, with quiet days on the Golfo Dulce.",
    intro: [
      "The south Pacific is where Costa Rica feels most untamed. This journey travels down the coast to the Osa Peninsula, where lodges are reached by boat and the forest is some of the richest in the Americas.",
      "It suits travellers who are comfortable with heat, humidity and a little adventure in getting from place to place, and who want wildlife to be the centre of the trip.",
    ],
    destinations: ["manuel-antonio", "osa"],
    image: "osa",
    secondaryImage: "whale",
    suggestedLength: "Around 9 to 12 nights",
    pace: "Unhurried, with long days outdoors",
    idealFor: ["Keen naturalists", "Return visitors", "Photographers", "Adventurous couples"],
    stages: [
      {
        place: "Uvita",
        stay: "2 to 3 nights",
        title: "The whale coast",
        body: "A stretch of coast where forest meets long beaches, and where humpback whales arrive at different times of year. Time on the water, and time doing very little.",
      },
      {
        place: "Drake Bay",
        stay: "3 to 4 nights",
        title: "Into Corcovado",
        body: "Arrive by boat on the northern edge of the Osa. Guided days in Corcovado, snorkelling around Caño Island, and evenings listening to the forest.",
      },
      {
        place: "Golfo Dulce",
        stay: "3 nights",
        title: "The quiet gulf",
        body: "Finish on the calm waters of the Golfo Dulce, where the rainforest runs to the shoreline and dolphins are a common sight.",
      },
    ],
    experiences: [
      "Guided days in Corcovado National Park",
      "Whale-watching in season",
      "Snorkelling around Caño Island",
      "Kayaking on the Golfo Dulce",
      "Night walks in lowland forest",
    ],
    stays: {
      intro:
        "The Osa is a place for lodges rather than hotels: often simple in their luxury, open to the forest, and run with care for the environment around them.",
      styles: ["Remote eco-lodges", "Small beach lodges", "Forest cabins on the gulf"],
    },
    considerations: [
      "Some transfers are by boat and involve wet landings on the beach; we'll advise on luggage.",
      "Corcovado can only be visited with authorised guides.",
      "From roughly September to November, heavy rain affects access, and some lodges close for part of that time.",
    ],
    seoDescription:
      "A tailor-made itinerary idea for Costa Rica's wild south: Uvita, Drake Bay, Corcovado National Park and the Golfo Dulce.",
  },
  {
    slug: "slow-days-on-nicoya",
    title: "Slow Days on Nicoya",
    kicker: "Dry forest, surf and long afternoons",
    summary:
      "A short stay in Guanacaste's dry forest, then two unhurried bases on the Nicoya Peninsula, each with its own character.",
    intro: [
      "Not every trip needs to cover ground. This journey is built around the Pacific, with just enough variety to keep things interesting: a couple of nights inland among the dry forest and volcanoes, then two longer stays on the peninsula.",
      "It suits couples, families who want an easy rhythm, and anyone whose idea of a holiday includes a surfboard, a good book or both.",
    ],
    destinations: ["guanacaste", "nicoya"],
    image: "nicoya",
    secondaryImage: "guanacaste",
    suggestedLength: "Around 9 to 10 nights",
    pace: "Slow",
    idealFor: ["Couples", "Surfers of all levels", "Families", "A second trip to Costa Rica"],
    stages: [
      {
        place: "Guanacaste",
        stay: "2 nights",
        title: "Dry forest and volcano",
        body: "Begin near Liberia with a taste of the dry forest and the volcanic landscapes of Rincón de la Vieja.",
      },
      {
        place: "Nosara",
        stay: "4 nights",
        title: "Into the trees",
        body: "Low-rise and leafy, Nosara is made for morning surf, yoga and long walks on the beach. Ostional's turtles are nearby when the timing is right.",
      },
      {
        place: "Southern Nicoya",
        stay: "3 to 4 nights",
        title: "To the tip",
        body: "Further south, around Santa Teresa or Montezuma: surf, waterfalls and the protected forest of Cabo Blanco.",
      },
    ],
    experiences: [
      "Surf lessons or guided surf days",
      "Yoga and wellbeing",
      "Turtle nesting at Ostional, in season",
      "Waterfall walks near Montezuma",
      "Sunset sailing",
    ],
    stays: {
      intro:
        "Small hotels and villas set back among the trees, often with a short walk to the beach. Many travellers on this route choose a private house for at least part of the stay.",
      styles: ["Boutique beach hotels", "Private villas", "Small wellness retreats"],
    },
    considerations: [
      "Roads on the peninsula are often unpaved and slow; some routes involve river crossings in the rainy months.",
      "December to April is driest and busiest; we recommend planning well ahead for those months.",
      "Turtle arribadas at Ostional are natural events that can't be scheduled precisely.",
    ],
    seoDescription:
      "A slow, beach-focused Costa Rica itinerary idea: Guanacaste's dry forest, Nosara and the southern Nicoya Peninsula, tailored to you.",
  },
  {
    slug: "a-naturalists-costa-rica",
    title: "A Naturalist's Costa Rica",
    kicker: "Wildlife at the centre of every day",
    summary:
      "Canals and turtle beaches on the Caribbean, the cloud forest, then the deep rainforest of the Osa. Built for people who travel with binoculars.",
    intro: [
      "For travellers who measure a trip in sightings, this journey crosses the country to visit three of its richest habitats: the canals and beaches of Tortuguero, the cloud forest of Monteverde and the lowland rainforest of the Osa Peninsula.",
      "It's a longer trip with more travel between regions, and it is designed around the hours when wildlife is most active: early starts, rests in the heat of the day, and guided walks after dark.",
    ],
    destinations: ["caribbean", "monteverde", "osa"],
    image: "canal",
    secondaryImage: "bridge",
    suggestedLength: "Around 12 to 14 nights",
    pace: "Full, with early mornings",
    idealFor: ["Birders", "Wildlife photographers", "Families with curious children", "Return visitors"],
    stages: [
      {
        place: "Tortuguero",
        stay: "2 to 3 nights",
        title: "The canals",
        body: "By boat into a world of water and forest. Dawn trips along the canals, and, in nesting season, a guided night on the turtle beach.",
      },
      {
        place: "Caribbean foothills",
        stay: "2 nights",
        title: "The lowlands",
        body: "A pause in the lowland forests between the coast and the mountains, rich in birds, frogs and the sounds of the night.",
      },
      {
        place: "Monteverde",
        stay: "3 nights",
        title: "The cloud forest",
        body: "Cooler days in the cloud forest, looking for quetzals, hummingbirds and the smaller lives of the forest floor.",
      },
      {
        place: "Osa Peninsula",
        stay: "4 nights",
        title: "Corcovado",
        body: "The finale: guided days in Corcovado and on the wild coast, where scarlet macaws, monkeys and much more are part of daily life.",
      },
    ],
    experiences: [
      "Dawn canal trips in Tortuguero",
      "Turtle nesting, in season",
      "Birding with specialist guides",
      "Night walks",
      "Guided days in Corcovado",
    ],
    stays: {
      intro:
        "Lodges chosen for where they are rather than how they look: on the canals, inside the forest, and on the edge of Corcovado. Comfort varies by region, and we'll always be clear about what to expect.",
      styles: ["Canal-side lodges", "Forest lodges", "Remote eco-lodges"],
    },
    considerations: [
      "This journey involves several regional transfers, some by boat or small plane.",
      "Wildlife sightings can never be guaranteed; good guides and patience improve the odds considerably.",
      "Turtle nesting in Tortuguero is seasonal, peaking from around July to October.",
    ],
    seoDescription:
      "A wildlife-focused Costa Rica itinerary idea: Tortuguero, Monteverde's cloud forest and Corcovado on the Osa Peninsula, planned around you.",
  },
];

export function getJourney(slug: string) {
  return journeys.find((j) => j.slug === slug);
}

export function journeysForDestination(slug: string) {
  return journeys.filter((j) => j.destinations.includes(slug));
}
