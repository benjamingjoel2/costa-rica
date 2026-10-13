// Central image manifest. Every image on the site is referenced by key, so
// changing a photo means editing this file only (see docs/IMAGERY.md).
//
// Photos are from Pexels (https://www.pexels.com/license/), stored locally in
// public/images/photos. They show Costa Rica's landscapes and wildlife in
// general and are not presented as specific properties, partners or tours.

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the image is cropped. */
  position?: string;
  /** Source photo page, kept for credit and licensing records. */
  credit: string;
};

const photo = (key: string, pexelsId: number, width: number, height: number, alt: string, position?: string): ImageAsset => ({
  src: `/images/photos/${key}.jpg`,
  alt,
  width,
  height,
  position,
  credit: `https://www.pexels.com/photo/${pexelsId}/`,
});

export const images = {
  heroCanopy: photo("heroArenal", 923228, 2400, 1350, "Arenal Volcano at dusk with a glowing cloud cap, above dark forest and Lake Arenal", "55% 45%"),
  arenal: photo("arenal", 19344663, 1333, 2000, "The cone of Arenal Volcano above dense green forest", "50% 40%"),
  monteverde: photo("monteverde", 18585029, 2000, 1334, "A suspension bridge disappearing into mist in the cloud forest"),
  bridge: photo("bridge", 16806198, 1333, 2000, "A red hanging bridge leading through tall cloud forest in Monteverde"),
  guanacaste: photo("guanacaste", 33742008, 1125, 2000, "Palm trees shading a white-sand beach under a blue sky", "50% 60%"),
  nicoya: photo("nicoya", 35919338, 2000, 1334, "Palm silhouettes against an orange sunset over the Pacific"),
  manuelAntonio: photo("manuelAntonio", 11181988, 2000, 1125, "Aerial view of Manuel Antonio's forested coastline and turquoise bay"),
  osa: photo("osa", 14482337, 2000, 1125, "Aerial view of a forested headland reaching into turquoise Pacific water"),
  caribbean: photo("caribbean", 776717, 2000, 1125, "Aerial view of palm-covered coastline and surf near Limón on the Caribbean coast"),
  canal: photo("canal", 32741386, 2000, 1474, "A brown-throated sloth hanging from a branch in the rainforest"),
  hotSprings: photo("hotSprings", 14580735, 2000, 1334, "Thermal water cascading through tropical gardens near La Fortuna"),
  lodge: photo("lodge", 27379639, 2000, 1334, "A swimming pool terrace surrounded by tropical gardens and forested hills"),
  coffee: photo("coffee", 2918149, 2000, 1334, "A hanging bridge stretching across misty forest canopy"),
  waterfall: photo("waterfall", 19393500, 1333, 2000, "The Río Celeste waterfall falling into a bright turquoise pool"),
  fronds: photo("fronds", 18628471, 2000, 1334, "A red-eyed tree frog resting on a green leaf"),
  whale: photo("whale", 9500926, 2000, 1334, "A humpback whale's tail lifting from the ocean"),
  river: photo("river", 12831050, 2000, 1334, "The pale blue Río Celeste flowing through rainforest"),
  market: photo("market", 4615995, 1333, 2000, "Papayas, pineapples and fresh produce stacked at a market stall"),
  trail: photo("trail", 31423342, 1600, 2000, "A misty path through mossy cloud forest"),
  toucan: photo("toucan", 16322443, 2000, 1334, "A keel-billed toucan in profile against soft green"),
  slothBaby: photo("slothBaby", 26050828, 2000, 1334, "A sloth with her baby hanging among leaves"),
  capuchin: photo("capuchin", 37720197, 1600, 2000, "A white-faced capuchin monkey perched on a branch"),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
