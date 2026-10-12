// Central image manifest. Every image on the site is referenced by key, so
// changing a photo means editing this file only (see docs/IMAGERY.md).
//
// Photos are from Unsplash, used under the Unsplash License
// (https://unsplash.com/license). They show Costa Rica's regions and wildlife
// in general and are not pictures of specific properties or partners.

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the image is cropped. */
  position?: string;
  /** Unsplash photo page, kept for credit and licensing records. */
  credit: string;
};

/** Unsplash's stable download endpoint redirects to the full-size image. */
const unsplash = (id: string, alt: string, position?: string): ImageAsset => ({
  src: `https://unsplash.com/photos/${id}/download?w=2400`,
  alt,
  width: 2400,
  height: 1600,
  position,
  credit: `https://unsplash.com/photos/${id}`,
});

export const images = {
  heroCanopy: unsplash("ej_L8rJEjJg", "A volcano rising above dense green rainforest in northern Costa Rica"),
  arenal: unsplash("-l62dbDw-vc", "Lush green hills and mountains around Arenal under an overcast sky"),
  monteverde: unsplash("K-x7h4NXtAY", "Tall trees fading into mist in the Monteverde cloud forest"),
  bridge: unsplash("6W8f3vRk6vk", "A suspension bridge strung through the forest canopy"),
  guanacaste: unsplash("Z5kUBFS1pbo", "A sandy Guanacaste beach backed by palm trees and green hills"),
  nicoya: unsplash("iZAymrwM2as", "Aerial view of surf breaking on a sandy, palm-lined Pacific beach"),
  manuelAntonio: unsplash("IJ0SB3fu_WI", "Rainforest meeting the water in Manuel Antonio National Park"),
  osa: unsplash("SXMt2xtb2oI", "Aerial view of tropical forest running down to the water at Drake Bay on the Osa Peninsula"),
  caribbean: unsplash("onCFv3GqR5c", "Aerial view of beach and forest at Puerto Viejo de Talamanca on the Caribbean coast"),
  canal: unsplash("tNulHhPcsSk", "A three-toed sloth hanging from a branch in the forest at Tortuguero"),
  hotSprings: unsplash("kgRq4mXOHEE", "La Fortuna waterfall dropping into a pool surrounded by rainforest"),
  lodge: unsplash("HqfGpXuxpP4", "Aerial view where rainforest meets the beach at Bahía Ballena"),
  coffee: unsplash("rUTAE5YwkKY", "Sunset over the water and trees at Marino Ballena National Park"),
  waterfall: unsplash("oaJhEgvPXoo", "The pale blue Río Celeste flowing through forest in Tenorio Volcano National Park"),
  fronds: unsplash("H4Mqn6uh8bo", "A red-eyed tree frog peering over a green leaf"),
  whale: unsplash("v5zG_N_qPEo", "A humpback whale swimming in the Pacific off Uvita"),
  river: unsplash("WDBqiHt3tNo", "A waterfall pouring through green forest in Guanacaste"),
  market: unsplash("eiCzR_AVHJQ", "A hand holding a freshly picked tropical fruit in Costa Rica"),
  trail: unsplash("xXpx3K2DjCs", "A hiker jumping from the rocks into the river at the Nauyaca waterfalls"),
  toucan: unsplash("AFObnLqv6Ag", "A keel-billed toucan perched among green leaves near Cahuita"),
  macaws: unsplash("PMx6rWQnduQ", "Two scarlet macaws flying against a blue sky at Drake Bay"),
  capuchin: unsplash("iKvgQPkXj1w", "A white-faced capuchin monkey sitting on a wooden fence near Quepos"),
  turtle: unsplash("4q965LrX7Ls", "A sea turtle on the sand at dawn on the Guanacaste coast"),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
