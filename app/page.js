async function getMeals() {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  const data = await res.json();
  return data.meals;
}

export default async function Home() {
  const meals = await getMeals();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <a key={meal.idMeal} href={`/meals/${meal.idMeal}`} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{meal.strMeal}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}