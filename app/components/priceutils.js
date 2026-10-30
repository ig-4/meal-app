export function getMealPrice(idMeal) {
  // Turn the meal's ID into a number, then map it into a believable price range
  const numericId = parseInt(idMeal, 10);
  const price = 5 + (numericId % 30); 
  return price;
}