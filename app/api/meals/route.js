import { fetchMeals } from "@/app/lib/mealdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const meals = await fetchMeals(category);
    return Response.json({ meals });
  } catch (error) {
    return Response.json({ error: "Failed to fetch meals" }, { status: 500 });
  }
}