import { fetchCategories } from "@/app/lib/mealdb";

export async function GET() {
  try {
    const categories = await fetchCategories();
    return Response.json({ categories });
  } catch (error) {
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}