fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
      parsedFoods.forEach (food => {
        console.log(food) // Should have a `barcode` property

        // Now fetch the food from the Food API
        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
          .then(response => response.json())
          .then(productInfo => {
            if (productInfo.product.ingredients_text) {
              food.ingredients = productInfo.product.ingredients_text
            } else {
              food.ingredients = "no ingredients listed"
            } if (productInfo.product.countries) {
              food.origin = productInfo.product.countries
            } else {
              food.origin = "no origin listed"
            } if (productInfo.product.nutriments.energy_value) {
              food.calories = productInfo.product.nutriments.energy_value
            } else {
              food.calories = "calories not listed"
            } if (productInfo.product.nutriments.fat_serving) {
              food.fat = productInfo.product.nutriments.fat_serving
            } else {
              food.fat = "fat not listed"
            } if (productInfo.product.nutriments.sugars_serving) {
              food.sugar = productInfo.product.nutriments.sugars_serving
            } else {
              food.sugar = "sugar not listed"
            }

            // Produce HTML representation
            const foodToHTML = createFoodComponent(food)

            // Add representation to DOM
            addFoodToDom(foodToHTML)
          }) 
      })
});


function createFoodComponent (food) {
  return `
    <div>
      <h1>${food.name}</h1>
      <p>Category: ${food.category}</p>
      <p>Ethnicity: ${food.ethnicity}</p>
      <p>Ingredients: ${food.ingredients}</p>
      <p>Country of Origin: ${food.origin}</p>
      <p>Calories per serving: ${food.calories} cal</p>
      <p>Fat per serving(g): ${food.fat}</p>
      <p>Sugar per serving(g): ${food.sugar}</p>
    </div>
  `
};

function addFoodToDom (food) {
  document.querySelector(".foodList").innerHTML += food
}

