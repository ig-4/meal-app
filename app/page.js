import MealCard from "./components/MealCard";
import CategoryFilter from "./components/CategoryFilter";
import { fetchMeals, fetchCategories } from "./lib/mealsdb";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;

  const [categories, meals] = await Promise.all([
    fetchCategories(),
    fetchMeals(category),
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Meals</h1>
      <CategoryFilter categories={categories} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}