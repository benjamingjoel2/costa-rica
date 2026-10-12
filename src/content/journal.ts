import type { Article } from "./types";

// A small initial editorial collection. Articles carry no author or date
// until real bylines and publication dates exist.

export const articles: Article[] = [
  {
    slug: "pacific-or-caribbean",
    title: "Pacific or Caribbean? Choosing your coast",
    category: "Destinations",
    dek: "Costa Rica's two coastlines are less than a day apart and feel like different countries. Here's how to decide between them, or whether to see both.",
    image: "caribbean",
    body: [
      {
        type: "p",
        text: "Ask people about a beach in Costa Rica and most will picture the Pacific: long sunsets, surf and dry-season sun. The Caribbean coast is less visited and quite different in character, and for some travellers it's the better choice. The right answer depends on when you're travelling, what you want from your time by the sea, and how much of the trip you want to spend moving around.",
      },
      { type: "h2", text: "The Pacific: range and reliability" },
      {
        type: "p",
        text: "The Pacific coast is long and varied. In the north, Guanacaste has the most dependable dry-season weather in the country and bays sheltered from the open ocean. The Nicoya Peninsula brings surf towns and quieter beaches. The Central Pacific mixes beach with wildlife-rich forest around Manuel Antonio, and the far south, around Uvita and the Osa Peninsula, is wilder still.",
      },
      {
        type: "p",
        text: "Broadly, the Pacific is driest from around December to April. That's also when it's busiest.",
      },
      { type: "h2", text: "The Caribbean: culture and contrast" },
      {
        type: "p",
        text: "The Caribbean side is greener and slower, with a culture shaped by Afro-Caribbean and Indigenous communities. Tortuguero in the north is all canals, forest and nesting turtles; the south coast around Cahuita and Puerto Viejo has reef, small beaches and some of the best cooking in the country.",
      },
      {
        type: "p",
        text: "Its weather follows a different pattern. September and October, which are among the wettest months on the Pacific, are often among the driest on the Caribbean.",
      },
      { type: "image", image: "nicoya", caption: "The Pacific: wide horizons and evening light." },
      { type: "h2", text: "A rough way to choose" },
      {
        type: "list",
        items: [
          "Travelling between December and April, mainly for the beach: start with the Pacific.",
          "Travelling in September or October: look closely at the Caribbean.",
          "More interested in culture and food than in a resort: the Caribbean will reward you.",
          "Wildlife your priority: both coasts have a great deal to offer, in different ways.",
        ],
      },
      { type: "h2", text: "Can you do both?" },
      {
        type: "p",
        text: "You can, but crossing the country takes most of a day, so combining coasts works best on trips of two weeks or more. On shorter trips, choosing one coast and seeing it well is usually the better decision.",
      },
      {
        type: "aside",
        title: "Planning note",
        text: "Weather patterns are tendencies, not promises. We look at the specific dates and places you're considering before recommending a coast.",
      },
    ],
    relatedJourneys: ["a-naturalists-costa-rica", "slow-days-on-nicoya"],
    relatedDestinations: ["caribbean", "guanacaste", "nicoya"],
    seoDescription:
      "Pacific or Caribbean? How Costa Rica's two coasts differ in weather, culture and character, and how to choose the right one for your trip.",
  },
  {
    slug: "understanding-costa-ricas-seasons",
    title: "Understanding Costa Rica's seasons",
    category: "Seasons",
    dek: "Dry season, green season and the regional differences that matter more than either. A practical guide to when to go.",
    image: "monteverde",
    body: [
      {
        type: "p",
        text: "Costa Rica is often described as having two seasons: a dry season from around December to April and a green, or rainy, season from around May to November. That's a useful start, but the reality varies considerably by region, and the green season has more to offer than its name suggests.",
      },
      { type: "h2", text: "The dry season" },
      {
        type: "p",
        text: "On the Pacific side and in the Central Valley, the dry months bring the most predictable sunshine. Guanacaste, in particular, can go weeks without rain. These months, along with Christmas, New Year and Easter, are the busiest of the year, and the best-loved places to stay are often booked well in advance.",
      },
      { type: "h2", text: "The green season" },
      {
        type: "p",
        text: "In much of the country, a typical green-season day starts bright, with clouds building towards rain in the afternoon. Forests are at their most lush, rivers run high and many areas are quieter. July often brings a drier spell on the Pacific side.",
      },
      {
        type: "p",
        text: "The heaviest rain on the Pacific generally falls from around September to November. In the south especially, this can affect access, and some lodges close for part of that period.",
      },
      { type: "image", image: "river", caption: "Green season: high rivers and the forest at its fullest." },
      { type: "h2", text: "The regions that break the rules" },
      {
        type: "list",
        items: [
          "The Caribbean coast has its own pattern, and September and October are often relatively dry there.",
          "Arenal and the northern lowlands can see rain at any time of year.",
          "Monteverde is frequently misty and windy whatever the season. That's part of what a cloud forest is.",
        ],
      },
      { type: "h2", text: "Seasons for wildlife" },
      {
        type: "p",
        text: "Some of the country's great natural events are seasonal. Green turtles nest at Tortuguero mostly from around July to October. Humpback whales visit the south Pacific in two seasons, from both hemispheres. Resplendent quetzals are often easiest to see in the cloud forest during their nesting season early in the year.",
      },
      {
        type: "aside",
        title: "Planning note",
        text: "There is no wrong time to visit Costa Rica, but there are better and worse places to be in a given month. Tell us when you can travel and we'll shape the route around it.",
      },
    ],
    relatedJourneys: ["rainforest-to-the-pacific", "the-wild-south"],
    relatedDestinations: ["guanacaste", "caribbean", "osa"],
    seoDescription:
      "When to visit Costa Rica: the dry and green seasons explained, regional exceptions, and seasonal wildlife events to plan around.",
  },
  {
    slug: "cloud-forest-or-rainforest",
    title: "Cloud forest or rainforest: what's the difference?",
    category: "Nature",
    dek: "Both are green, wet and full of life. But walking through each feels completely different, and most good itineraries include both.",
    image: "bridge",
    body: [
      {
        type: "p",
        text: "Costa Rica's forests change dramatically with altitude. In the space of a few hours' drive you can move from steamy lowland rainforest to cool cloud forest wrapped in mist. Understanding the difference helps when choosing where to spend your time.",
      },
      { type: "h2", text: "Lowland rainforest" },
      {
        type: "p",
        text: "Lowland rainforest, like that of the Osa Peninsula, the Caribbean lowlands and much of the area around Arenal, is hot, humid and tall. Giant trees rise above a dense, layered canopy, and the forest is full of sound: howler monkeys at dawn, cicadas, the calls of macaws and toucans. It's where many people see the animals they came for.",
      },
      { type: "h2", text: "Cloud forest" },
      {
        type: "p",
        text: "Higher up, in places such as Monteverde, the forest is bathed in cloud for much of the year. Trees are shorter and every surface is covered in mosses, ferns, orchids and bromeliads. The air is cool, the light soft, and the life more often small and close at hand: hummingbirds, frogs and insects, as well as the famous quetzal.",
      },
      { type: "image", image: "fronds", caption: "In both forests, the detail rewards a slower look." },
      { type: "h2", text: "Which should you choose?" },
      {
        type: "p",
        text: "Ideally, both. They complement each other, and the journey between them is part of the experience. If time is tight, think about what matters most: mammals and big wildlife tend to point towards the lowlands, while walkers, birders and anyone who loves atmosphere often fall for the cloud forest.",
      },
      {
        type: "list",
        items: [
          "Pack a warm layer and a light waterproof for the cloud forest.",
          "In the lowlands, plan walks for early morning and late afternoon, when it's cooler and wildlife is more active.",
          "In both, a naturalist guide will show you far more than you'd find alone.",
        ],
      },
    ],
    relatedJourneys: ["volcanoes-and-cloud-forest", "a-naturalists-costa-rica"],
    relatedDestinations: ["monteverde", "osa", "arenal"],
    seoDescription:
      "Cloud forest vs rainforest in Costa Rica: how they differ, what you'll see in each, and how to include both in your itinerary.",
  },
  {
    slug: "pacing-a-first-trip",
    title: "How to pace a first trip to Costa Rica",
    category: "Planning",
    dek: "The country looks small on a map. The most common planning mistake is trying to see too much of it.",
    image: "trail",
    body: [
      {
        type: "p",
        text: "Costa Rica is roughly the size of a small European country, and it's tempting to assume you can cover most of it in a week or two. In practice, mountain roads, weather and the simple pleasure of being somewhere make a slower pace far more rewarding.",
      },
      { type: "h2", text: "Why distances are deceptive" },
      {
        type: "p",
        text: "Many routes between regions cross mountains, and roads can be winding, slow and, in places, unpaved. A journey that looks short on a map can take much of a day. Domestic flights and private transfers help in some cases, but every move between bases still takes time and energy.",
      },
      { type: "h2", text: "A sensible rhythm" },
      {
        type: "list",
        items: [
          "Aim for two or three nights in most places, and longer at the coast.",
          "On a trip of ten to twelve nights, three or four bases is usually plenty.",
          "Allow a rest day after a long transfer or an early wildlife start.",
          "Leave some afternoons unplanned. They're often the best part.",
        ],
      },
      { type: "image", image: "lodge", caption: "Time in one place lets a trip breathe." },
      { type: "h2", text: "Start with what matters most" },
      {
        type: "p",
        text: "Rather than starting with a list of places, start with what you most want from the trip: wildlife, walking, the beach, food, rest. Then choose the regions that deliver it best at the time of year you're travelling. That usually produces a better route than trying to fit in every famous name.",
      },
      {
        type: "aside",
        title: "Planning note",
        text: "This is exactly the kind of balancing we do when designing an itinerary. Share your priorities and we'll suggest a pace that suits you.",
      },
    ],
    relatedJourneys: ["rainforest-to-the-pacific", "slow-days-on-nicoya"],
    relatedDestinations: ["arenal", "monteverde", "manuel-antonio"],
    seoDescription:
      "How to plan the pace of a first trip to Costa Rica: realistic travel times, how many bases to choose and how to build in rest.",
  },
  {
    slug: "watching-wildlife-well",
    title: "Watching wildlife well",
    category: "Nature",
    dek: "How to see more, disturb less and come home with better memories of Costa Rica's animals.",
    image: "whale",
    body: [
      {
        type: "p",
        text: "Seeing animals in the wild is the reason many people come to Costa Rica. Doing it well is partly about where and when you look, and partly about how you behave once you've found them.",
      },
      { type: "h2", text: "Seeing more" },
      {
        type: "list",
        items: [
          "Go early. The first hours after dawn are usually the most active.",
          "Walk slowly and stop often. Much of the forest's life is still and camouflaged.",
          "Go with a naturalist guide. Their eyes, ears and spotting scope make a remarkable difference.",
          "Try a night walk. A whole second cast of animals appears after dark.",
        ],
      },
      { type: "h2", text: "Disturbing less" },
      {
        type: "list",
        items: [
          "Never feed wild animals, including monkeys and coatis that approach people.",
          "Keep a respectful distance, and let animals move away if they choose.",
          "Avoid flash photography, particularly at night and on turtle beaches.",
          "On the water, choose operators who follow responsible whale- and dolphin-watching practice.",
        ],
      },
      { type: "image", image: "canal", caption: "Quiet boats and early starts: the canals at their best." },
      { type: "h2", text: "Managing expectations" },
      {
        type: "p",
        text: "Wild animals keep their own schedules, and no responsible guide or travel planner can promise a particular sighting. What good planning can do is put you in the right habitats, at the right time, with people who know them well. The rest is patience, and a little luck.",
      },
    ],
    relatedJourneys: ["a-naturalists-costa-rica", "the-wild-south"],
    relatedDestinations: ["osa", "caribbean", "manuel-antonio"],
    seoDescription:
      "A practical guide to responsible wildlife watching in Costa Rica: how to see more, disturb less and choose good guides.",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function readingMinutes(article: Article) {
  const words = article.body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "image" ? (b.caption ?? "") : b.type === "aside" ? `${b.title} ${b.text}` : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
