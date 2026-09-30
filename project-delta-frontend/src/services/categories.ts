export type CategoryKey = "cafe" | "restaurant" | "museum" | "playground";

export const CATEGORY_GROUPS: { key: CategoryKey; label: string; geoapifyPrefix: string }[] = [
  { key: "cafe", label: "Cafés", geoapifyPrefix: "catering.cafe" },
  { key: "restaurant", label: "Restaurants", geoapifyPrefix: "catering.restaurant" },
  { key: "museum", label: "Museums", geoapifyPrefix: "entertainment.museum" },
  { key: "playground", label: "Playgrounds", geoapifyPrefix: "leisure.playground" },
];


export const GEOAPIFY_CATEGORIES = CATEGORY_GROUPS.map((g) => g.geoapifyPrefix).join(",");

export function matchCategory(rawCategories: string[]): CategoryKey | "other" {
  for (const group of CATEGORY_GROUPS) {
    if (rawCategories.some((c) => c.startsWith(group.geoapifyPrefix))) {
      return group.key;
    }
  }
  return "other";
}