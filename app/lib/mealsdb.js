const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchMeals(category) {
  const url = category
    ? `${BASE_URL}/filter.php?c=${category}`
    : `${BASE_URL}/search.php?s=`;
  const res = await fetch(url, {cache: "no-store"});
  if (!res.ok) throw new Error("Failed to fetch meals");
  const data = await res.json();
  return data.meals;
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`, {cache: "no-store"});
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.categories;
}
                                                                                            