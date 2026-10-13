import type { Destination } from "./types";

// Editorial destination guides. Facts here are general and well established;
// travel times and opening arrangements are deliberately not stated because they
// change and are confirmed per trip.

export const destinations: Destination[] = [
  {
    slug: "arenal",
    name: "Arenal and the Northern Plains",
    shortName: "Arenal",
    area: "Northern lowlands",
    tagline: "A volcano that holds the view, and warm rivers at its feet.",
    summary:
      "A near-perfect volcanic cone, forest trails across old lava flows and hot springs fed by the heat below. One of the most versatile bases in the country.",
    lede: "Arenal is the picture many people carry of Costa Rica before they arrive: a steep, symmetrical cone rising out of farmland and forest, often wearing a collar of cloud. The volcano has been in a resting phase since 2010, and the country around La Fortuna has become one of the most varied places to spend a few days.",
    image: "arenal",
    secondaryImage: "hotSprings",
    chapters: [
      {
        heading: "A landscape the volcano made",
        body: [
          "Arenal's long eruptive period began in 1968, and the lava flows from those decades are still legible on its western flanks, now softened by young forest. Trails in and around the national park cross this ground, so a morning walk can take you from rainforest to open volcanic rock and back again.",
          "To the west lies Lake Arenal, the largest body of water in the country, framed by green hills that roll on towards Tilarán and the cloud forest beyond.",
        ],
      },
      {
        heading: "Heat from below",
        body: [
          "Geothermal heat feeds a string of hot springs around the volcano, from carefully landscaped pools to simpler places where warm water runs through the forest. After a day on foot, an evening soak is the region's natural rhythm.",
        ],
      },
      {
        heading: "Beyond the cone",
        body: [
          "Hanging bridges carry you through the canopy; La Fortuna's waterfall drops into a deep pool below the town; rivers nearby are run by rafting and kayaking outfitters of different levels. Further north, the wetlands of Caño Negro are known for waterbirds, and the pale blue Río Celeste in Tenorio Volcano National Park is within reach as a full day out.",
        ],
      },
    ],
    landscapes: ["Volcanic cone and old lava flows", "Foothill rainforest", "Lake Arenal", "Rivers and waterfalls"],
    experiences: ["Volcano and rainforest walks", "Hot springs", "Hanging bridges", "Rafting and kayaking", "Birding in the wetlands to the north"],
    suits:
      "First-time visitors who want a great deal within easy reach, families who need variety, and anyone who likes soft adventure balanced with time in thermal water.",
    fit: "Arenal makes a natural first or second chapter. It pairs easily with Monteverde across the lake, or with the beaches of Guanacaste to the west.",
    season:
      "Arenal sits on the wetter, Caribbean-influenced side of the mountains, so rain can fall in any month. A clear view of the summit is never guaranteed; early mornings often give the best chance.",
    pairsWith: ["monteverde", "guanacaste"],
    seoDescription:
      "A guide to Arenal and Costa Rica's northern plains: the volcano, hot springs, rainforest trails and how to fit the region into a tailor-made itinerary.",
  },
  {
    slug: "monteverde",
    name: "Monteverde and the Cloud Forest",
    shortName: "Monteverde",
    area: "Tilarán mountains",
    tagline: "Mist, moss and the cool air of the continental divide.",
    summary:
      "High, cool and often in cloud. A forest of mosses, orchids and bromeliads, best walked slowly and with a naturalist beside you.",
    lede: "High on the continental divide, Monteverde feels like another country from the lowlands below. Trade winds push moisture up the slopes and the forest lives in cloud for much of the year: branches thick with moss and orchids, bromeliads in every fork, and a light that changes by the minute.",
    image: "monteverde",
    secondaryImage: "bridge",
    chapters: [
      {
        heading: "Living in the cloud",
        body: [
          "Several reserves protect the forest here, among them the Monteverde Cloud Forest Reserve and the Santa Elena Reserve. Much of the life is small and close at hand: hummingbirds at forest edges, frogs in the understorey, epiphytes layered on every surface.",
          "For many birders, the resplendent quetzal is the reason to come. It lives in these mountains year-round, and the early months of the year, when it nests, often bring the best chances of a sighting.",
        ],
      },
      {
        heading: "Walking slowly",
        body: [
          "Monteverde rewards patience more than distance. A morning on the trails with a good naturalist, who knows the calls and carries a spotting scope, reveals far more than a long hike alone. After dark the forest changes completely, and a guided night walk is often what people remember most.",
          "Hanging bridges and canopy walkways offer a view from the treetops, where much of the cloud forest's life actually happens.",
        ],
      },
      {
        heading: "A community with its own story",
        body: [
          "In the early 1950s a group of Quaker families from the United States settled here, began dairy farming and set aside forest to protect the watershed. That mix of farming roots and early conservation still shapes the character of the place.",
        ],
      },
    ],
    landscapes: ["Cloud forest", "Ridges and wind-shaped elfin forest", "Pastures and farmland on the lower slopes"],
    experiences: ["Guided reserve walks", "Night walks", "Birding", "Canopy bridges", "Coffee and chocolate farms"],
    suits:
      "Walkers, birders and naturalists; travellers who enjoy cooler air; anyone curious about how the forest changes with altitude.",
    fit: "Monteverde pairs naturally with Arenal. The roads up are winding, so most people give it at least two nights rather than treating it as a stop on the way through.",
    season:
      "Expect cooler temperatures than on the coast, especially at night, and wind in the drier months. Cloud and drizzle are part of the character, not a sign of bad luck.",
    pairsWith: ["arenal", "manuel-antonio"],
    seoDescription:
      "Monteverde's cloud forest explained: reserves, birding, night walks, the best way to experience the forest and how it fits into a Costa Rica itinerary.",
  },
  {
    slug: "guanacaste",
    name: "Guanacaste and the North Pacific",
    shortName: "Guanacaste",
    area: "North Pacific",
    tagline: "Dry forest, broad bays and the country's sunniest coast.",
    summary:
      "Gold hills in the dry season, protected bays, volcanoes inland and an international airport close by. The easiest coast to reach and the most reliably sunny.",
    lede: "In the northwest, Costa Rica changes colour. Guanacaste has a long, pronounced dry season, and from roughly December to April its hills turn gold and much of the tropical dry forest drops its leaves. The coast is broad and bright, with bays sheltered from the open Pacific and beaches that run south towards the Nicoya Peninsula.",
    image: "guanacaste",
    secondaryImage: "river",
    chapters: [
      {
        heading: "The other forest",
        body: [
          "Tropical dry forest is far rarer than rainforest, and in some ways more surprising. In the dry months the canopy opens and wildlife becomes easier to see around the remaining water. Santa Rosa National Park, within the Área de Conservación Guanacaste World Heritage Site, protects some of the most important stretches left anywhere in Central America.",
        ],
      },
      {
        heading: "Volcanoes inland",
        body: [
          "Inland from Liberia, Rincón de la Vieja National Park has fumaroles, bubbling mud pots and trails through forest on the flanks of an active volcano, along with waterfalls and swimming holes. It makes a striking counterpoint to time on the beach.",
        ],
      },
      {
        heading: "The coast",
        body: [
          "Around the Gulf of Papagayo, many of the country's larger resorts sit above protected bays. Further south the beach towns are smaller and more independent in feel, and the coastline grows wilder as it approaches Nicoya.",
        ],
      },
    ],
    landscapes: ["Tropical dry forest", "Protected Pacific bays", "Volcanic highlands around Rincón de la Vieja"],
    experiences: ["Beach time", "Volcano trails and thermal mud", "Sailing and snorkelling", "Horse riding on working ranches"],
    suits:
      "Travellers who want dependable beach weather in the dry season, families, and anyone ending a trip with a few unhurried days by the sea.",
    fit: "With an international airport at Liberia, Guanacaste is an easy place to begin or end a trip, and it combines well with Arenal and the Nicoya Peninsula.",
    season:
      "The contrast between seasons is greatest here. In the green season, afternoon rain returns and the landscape turns green almost overnight.",
    pairsWith: ["arenal", "nicoya"],
    seoDescription:
      "Guanacaste guide: tropical dry forest, Rincón de la Vieja, the North Pacific coast and how to include Costa Rica's sunniest region in a tailor-made trip.",
  },
  {
    slug: "nicoya",
    name: "The Nicoya Peninsula",
    shortName: "Nicoya",
    area: "Pacific peninsula",
    tagline: "Surf towns, quiet coves and long, slow afternoons.",
    summary:
      "Small surf towns, long empty beaches and rough roads that keep things slow. Come to stay put rather than tick things off.",
    lede: "The Nicoya Peninsula curls south from Guanacaste, and its Pacific shore is lined with small surf towns, long stretches of sand and rough roads that keep the pace deliberately unhurried. People come here to do less, and to do it well.",
    image: "nicoya",
    secondaryImage: "market",
    chapters: [
      {
        heading: "Every town its own character",
        body: [
          "Nosara is low-rise and spread out among the trees, with surf and yoga at its centre. Santa Teresa and Mal País are busier and younger in energy, built around consistent waves. Near the southern tip, Montezuma has waterfalls a short walk from the village, and Cabo Blanco, Costa Rica's first protected nature reserve, guards the end of the peninsula.",
        ],
      },
      {
        heading: "Turtles at Ostional",
        body: [
          "The Ostional National Wildlife Refuge is known for arribadas: mass nesting events in which olive ridley turtles come ashore in large numbers over several nights. They happen through much of the year, more often in the green season, and visits are regulated and guided.",
        ],
      },
      {
        heading: "A slower rhythm",
        body: [
          "Nicoya is among the regions researchers have identified as a “Blue Zone”, where an unusual proportion of people live into their nineties and beyond. You won't find it signposted, but you may notice the unhurried pace of the peninsula's inland towns.",
        ],
      },
    ],
    landscapes: ["Surf beaches and rocky points", "Coastal dry forest", "River mouths and estuaries"],
    experiences: ["Surf lessons and surf days", "Yoga and wellbeing", "Turtle nesting with local guides", "Waterfall walks"],
    suits:
      "Surfers of every level, couples, and anyone who wants the beach to be the point of the trip rather than its epilogue.",
    fit: "Nicoya is best given time. Roads can be slow and some routes cross rivers, so a longer stay in one or two places works far better than a quick add-on.",
    season:
      "Like Guanacaste, Nicoya is driest from around December to April. Some unpaved roads become harder going at the height of the rains.",
    pairsWith: ["guanacaste", "manuel-antonio"],
    seoDescription:
      "The Nicoya Peninsula: Nosara, Santa Teresa, Montezuma and Ostional, and how to plan an unhurried stay on Costa Rica's Pacific coast.",
  },
  {
    slug: "manuel-antonio",
    name: "Manuel Antonio and the Central Pacific",
    shortName: "Central Pacific",
    area: "Central Pacific coast",
    tagline: "Forest that runs straight down to the sand.",
    summary:
      "Rainforest trails, pale beaches and close wildlife encounters in one small park, with whale-watching coasts and mangroves further south.",
    lede: "On the Central Pacific coast near Quepos, forest and beach meet with unusual intimacy. Manuel Antonio National Park is one of the smallest national parks in the country and one of the most visited, for good reason: in a single morning you can walk forest trails, swim from a pale beach and watch wildlife at close range.",
    image: "manuelAntonio",
    secondaryImage: "whale",
    chapters: [
      {
        heading: "The park",
        body: [
          "Sloths, white-faced capuchins and the Central American squirrel monkey, which lives only along a stretch of the Pacific coast of Costa Rica and Panama, are all found here. A good guide with a spotting scope makes an enormous difference to what you see.",
          "The park manages visitor numbers and does not open every day of the week, so timing a visit well is part of planning.",
        ],
      },
      {
        heading: "Mangroves and rivers",
        body: [
          "Around Quepos, mangrove estuaries can be explored quietly by kayak or small boat, a gentler and less visited counterpart to the park itself.",
        ],
      },
      {
        heading: "South towards the whales",
        body: [
          "Further down the coast, Dominical and Uvita are smaller and more laid back. Marino Ballena National Park protects the water off Uvita, where humpback whales from both the northern and southern hemispheres arrive at different times of year.",
        ],
      },
    ],
    landscapes: ["Coastal rainforest", "Beaches and headlands", "Mangrove estuaries"],
    experiences: ["Guided wildlife walks", "Kayaking in the mangroves", "Whale-watching off Uvita", "Swimming and beach days"],
    suits:
      "Wildlife lovers with limited time, families, and travellers who want forest and beach in the same day.",
    fit: "Within comfortable reach of San José, the Central Pacific often closes a trip, or links the mountains with the wilder south.",
    season:
      "Wetter than Guanacaste, with green-season afternoons that are genuinely lush. The park is popular year-round, and early starts help.",
    pairsWith: ["monteverde", "osa"],
    seoDescription:
      "Manuel Antonio and the Central Pacific: wildlife in the national park, mangroves, whale-watching near Uvita and how to plan time on this coast.",
  },
  {
    slug: "osa",
    name: "The Osa Peninsula",
    shortName: "Osa",
    area: "South Pacific",
    tagline: "Remote, raw and astonishingly alive.",
    summary:
      "Lowland rainforest at its most intense, Corcovado National Park, and lodges reached by boat. Harder to reach, which is part of its appeal.",
    lede: "In the far southwest, the Osa Peninsula is the Costa Rica of field biologists' stories: primary lowland rainforest, rivers that run straight into the sea, and Corcovado National Park at its heart. Getting here takes more effort, and that is a large part of its appeal.",
    image: "osa",
    secondaryImage: "fronds",
    chapters: [
      {
        heading: "Corcovado",
        body: [
          "Corcovado protects one of the largest remaining areas of lowland tropical rainforest on the Pacific side of the Americas. Scarlet macaws are a common sight, all four of Costa Rica's monkey species live here, and the forest is home to Baird's tapir and other animals that are hard to find elsewhere.",
          "Entry to the park is with authorised guides, and the right guide is what turns a hot, humid walk into an extraordinary one.",
        ],
      },
      {
        heading: "Getting in",
        body: [
          "Access is part of the experience. Drake Bay, on the northern side, is reached by boat or small plane; Puerto Jiménez, on the Golfo Dulce, has an airstrip and road access. Many lodges are reached only by boat or on foot, which keeps the coast quiet.",
        ],
      },
      {
        heading: "The Golfo Dulce",
        body: [
          "On the sheltered eastern side, the Golfo Dulce is a deep, calm gulf, often described as a tropical fjord, where dolphins are frequently seen and the forest grows right to the waterline.",
        ],
      },
    ],
    landscapes: ["Primary lowland rainforest", "Wild Pacific beaches", "The sheltered Golfo Dulce"],
    experiences: ["Guided days in Corcovado", "Boat transfers along the coast", "Snorkelling around Caño Island", "Dolphin and whale sightings"],
    suits:
      "Experienced travellers, keen naturalists and photographers, and anyone happy to trade some polish for genuine remoteness.",
    fit: "Osa needs time. Three nights is a sensible minimum and more is better. It often closes a southern-focused trip, after the Central Pacific.",
    season:
      "The wettest months, roughly September to November, can make access and walking harder, and some lodges close for part of that period.",
    pairsWith: ["manuel-antonio"],
    seoDescription:
      "The Osa Peninsula and Corcovado National Park: what makes Costa Rica's wildest region special, how access works and how to plan time there.",
  },
  {
    slug: "caribbean",
    name: "The Caribbean Coast",
    shortName: "Caribbean",
    area: "Limón province",
    tagline: "Another rhythm entirely.",
    summary:
      "Turtle beaches and canals in the north, reef and forest in the south, and a culture shaped by Afro-Caribbean and Indigenous communities.",
    lede: "Cross the mountains to the east and Costa Rica's character shifts. The Caribbean coast has its own history, shaped by Afro-Caribbean communities whose families arrived from Jamaica and elsewhere in the late nineteenth century, and by the Bribri and Cabécar peoples of the Talamanca mountains. The food, the music and the pace are all different here.",
    image: "caribbean",
    secondaryImage: "canal",
    chapters: [
      {
        heading: "Tortuguero",
        body: [
          "In the north, Tortuguero is reached by boat or small plane, through a network of canals and rivers lined with forest. Its beach is one of the most important nesting sites for green turtles in the Western Hemisphere; nesting peaks from around July to October, and night visits to the beach are guided and regulated.",
          "By day, the canals are explored slowly by boat, kayak or canoe: herons and kingfishers, caimans on the banks, monkeys moving through the trees above.",
        ],
      },
      {
        heading: "The south coast",
        body: [
          "South of Limón, Cahuita National Park protects a coral reef and a trail that follows the shoreline through the forest. The towns of Puerto Viejo de Talamanca and Manzanillo sit among beaches backed by green, with an easy, outdoor way of life.",
        ],
      },
      {
        heading: "At the table",
        body: [
          "Rice and beans cooked in coconut milk, rondón stew of seafood and root vegetables, spiced patí pastries and Caribbean-style chicken: the coast's cooking is one of the clearest expressions of its heritage, and one of the best reasons to spend time here.",
        ],
      },
    ],
    landscapes: ["Canals and coastal lagoons", "Turtle-nesting beaches", "Reef and shoreline forest"],
    experiences: ["Canal trips at dawn", "Turtle nesting in season", "Snorkelling at Cahuita", "Caribbean cooking", "Cacao farms in Talamanca"],
    suits:
      "Travellers who value culture as much as scenery, and anyone who wants a coast that feels distinct from the Pacific.",
    fit: "The Caribbean works as a first chapter or as a contrast to time on the Pacific. Combining both coasts takes more travel, so it suits longer trips.",
    season:
      "The Caribbean doesn't follow the Pacific pattern: September and October are often among its drier months, just as the Pacific reaches its wettest.",
    pairsWith: ["arenal", "osa"],
    seoDescription:
      "Costa Rica's Caribbean coast: Tortuguero's canals and turtles, Cahuita and Puerto Viejo, Afro-Caribbean food and culture, and how to plan a visit.",
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
