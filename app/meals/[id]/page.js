export default async function MealPage({ params }) {
  const {id} = await params;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="max-w-md h-auto rounded-lg shadow-lg" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="text-gray-600">{meal.strInstructions}</p>
      </div>
    </div>
  );
}