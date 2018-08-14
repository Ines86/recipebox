const box = document.querySelector("#recipe-box");
const editBtn = document.querySelector(".edit");
const addBtn = document.querySelector("#add-recipe");
const category = document.querySelector('.show-category');
const sortBy = document.querySelector('.sort');
const recipeBox = Array.from(document.querySelectorAll(".recipe"));
const modal = document.querySelector('#recipeModal');
const modalBtn = document.getElementById('modalBtn');
const closeBtn = document.getElementsByClassName('closeBtn')[0];

let index = 0;
const recipes = JSON.parse(localStorage.getItem('items')) || [
    {
        title: "Tiramisu", img: 'img/cake.jpg', time: 30, level: "difficult", type: "dessert", ingredients: "6 egg yolks, 3/4 cup white sugar, 2/3 cup milk, 1 1/4 cups heavy cream, 1/2 teaspoon vanilla extract",
        description: "In a medium saucepan, whisk together egg yolks and sugar until well blended. Whisk in milk and cook over medium heat, stirring constantly, until mixture boils. Boil gently for 1 minute, remove from heat and allow to cool slightly. Cover tightly and chill in refrigerator 1 hour. In a medium bowl, beat cream with vanilla until stiff peaks form. Whisk mascarpone into yolk mixture until smooth. In a small bowl, combine coffee and rum. Split ladyfingers in half lengthwise and drizzle with coffee mixture. Arrange half of soaked ladyfingers in bottom of a 7x11 inch dish. Spread half of mascarpone mixture over ladyfingers, then half of whipped cream over that. Repeat layers and sprinkle with cocoa. Cover and refrigerate 4 to 6 hours, until set."
    },
    { title: "Tomato Pasta", img: 'img/pasta.jpg', time: 15, level: "easy", type: "dinner", ingredients: "1 package angel hair pasta, 1/4 cup olive oil, 1/2 onion, 1/4 cup grated Parmesan cheese, 2 cups roma (plum) tomatoes", description: "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 minutes or until al dente; drain. Pour olive oil in a large deep skillet over high-heat. Saute onions and garlic until lightly browned. Reduce heat to medium-high and add tomatoes, vinegar and chicken broth; simmer for about 8 minutes. Stir in red pepper, black pepper, basil and cooked pasta, tossing thoroughly with sauce. Simmer for about 5 more minutes and serve topped with grated cheese." },
    { title: "Cookies", img: 'img/cookies.jpg', time: 25, level: "medium", type: "dessert", ingredients: "1/2 cup butter, 1/2 cup white sugar, 1/2 cup peanut butter, 1/2 teaspoon vanilla extract, 1 egg, 1 cup flour, 1/2 cup rolled oats", description: "Preheat oven to 350 degrees F (175 degrees C). In a medium bowl, cream together the butter, white sugar and brown sugar until smooth. Stir in the peanut butter, vanilla and egg until well blended. Combine the flour, baking soda and salt; stir into the batter just until moistened. Mix in the oats and chocolate chips until evenly distributed. Drop by tablespoonfuls on to lightly greased cookie sheets. Bake for 10 to 12 minutes in the preheated oven, until the edges start to brown. Cool on cookie sheets for about 5 minutes before transferring to wire racks to cool completely." },
    { title: "Cheese Sandwich", img: 'img/sandwich.jpg', time: 20, level: "easy", type: "breakfast", ingredients: "4 slices white bread, 3 tablespoons butter, 2 slices Cheddar cheese", description: "Preheat skillet over medium heat. Generously butter one side of a slice of bread. Place bread butter-side-down onto skillet bottom and add 1 slice of cheese. Butter a second slice of bread on one side and place butter-side-up on top of sandwich. Grill until lightly browned and flip over; continue grilling until cheese is melted. Repeat with remaining 2 slices of bread, butter and slice of cheese." },
    { title: "Iced Coffee", img: 'img/icedCoffee.jpg', time: 25, level: "easy", type: "drink", ingredients: "1/2 cup warm water, 2 teaspoons instant coffee granules, 1 tray ice cubes, 1/2 (5 ounce) can sweetened condensed milk, 1/2 cup milk", description: "In a small bowl, stir together the water and instant coffee. In a blender, combine ice cubes, coffee mixture, milk, sweetened condensed milk and chocolate syrup. Blend until smooth. Pour into glasses and serve." },
    { title: "Caramel Coffee", img: 'img/coffee.jpg', time: 15, level: "medium", type: "drink", ingredients: "1/2 cup warm water, 2 teaspoons instant coffee granules, 1 tray ice cubes, 1/2 (5 ounce) can sweetened condensed milk, 1/2 cup milk", description: "In a small bowl, stir together the water and instant coffee. In a blender, combine ice cubes, coffee mixture, milk, sweetened condensed milk and chocolate syrup. Blend until smooth. Pour into glasses and serve." },
    { title: "Pancakes", img: 'img/pancakes.jpg', time: 20, level: "medium", type: "dinner", ingredients: "3/4 cup milk, 2 tablespoons white vinegar, 1 cup all-purpose flour, 2 tablespoons white sugar, 1 egg, 2 tablespoons butter,", description: "Combine milk with vinegar in a medium bowl and set aside for 5 minutes to sour. Combine flour, sugar, baking powder, baking soda, and salt in a large mixing bowl. Whisk egg and butter into soured milk. Pour the flour mixture into the wet ingredients and whisk until lumps are gone. Heat a large skillet over medium heat, and coat with cooking spray. Pour 1/4 cupfuls of batter onto the skillet, and cook until bubbles appear on the surface. Flip with a spatula, and cook until browned on the other side." },
    { title: "Salted Caramel Sauce", img: 'img/caramel.jpg', time: 25, level: "medium", type: "dessert", ingredients: "1 cup white sugar, 5 tablespoons butter, cut into slices, 1/2 cup heavy cream, 1 tablespoon heavy whipping cream, 1 pinch sea salt to taste", description: "Place sugar in a heavy-bottomed saucepan set over medium-high heat. Stir continuously until sugar begins to melt. Continue stirring until the sugar melts completely, begins to darken and all the chunks are dissolved, about 10 minutes. Stop stirring and continue to cook until the sugar begins to smoke and turns a dark shade of amber, 3 to 8 minutes. Remove from heat and wait 30 seconds. Whisk in butter until melted and combined. Slowly pour in 1/2 cup plus 1 tablespoon cream, taking care because it can bubble over. Sprinkle in salt and stir to combine. Transfer sauce to a jar and cool completely before refrigerating." },
];

// Generate Recipe Box
function createRecipeBox(items) {
    box.innerHTML = items.map(recipe => `
<div class="recipe" data-title="${recipe.title}">
<div class="top-content">
<button class="delete-btn">&times;</button>
<img src="${recipe.img}" alt="${recipe.title}" />
</div>
<div class="info">
    <h2>${recipe.title} </h2>
    <ul>
        <li>${recipe.level}</li>
        <li>${recipe.time} min</li>
        <li>${recipe.type}</li>
    </ul>
</div>
</div>
`).join('');
}


// Show full recipe
function displayRecipe(e) {
    let recipeTitle = "";
    const el = e.target;
    const parent = el.parentNode.parentNode;
    if (el.matches('h2') || el.matches('ul') || el.matches('img')) {
        recipeTitle = parent.dataset.title;
    } else if (el.matches('li')) {
        recipeTitle = parent.parentNode.dataset.title;
    } else if (el.matches('div .top-content') || (el.matches('div .info'))) {
        recipeTitle = el.parentNode.dataset.title;
    } else if (el.matches('.delete-btn')) {
        return;
    } else return;

    index = recipes.findIndex(recipe => recipe.title === recipeTitle);

    document.querySelector(".modal-body .recipe-img").innerHTML = `
    <img src="${recipes[index].img}" />
    `;

    document.querySelector(".modal-body .recipe-content").innerHTML = `
    <h2>${recipes[index].title}</h2>
    <p><span class="bold">Ingredients</span>: ${recipes[index].ingredients}</p>
    <p><span class="bold">How to make it</span>: ${recipes[index].description}</p>
    <ul>
    <li><p><span class="bold">Time</span>: ${recipes[index].time} min</p></li>
    <li><p><span class="bold">Level</span>: ${recipes[index].level}</p></li>
    <li><p><span class="bold">Category</span>: ${recipes[index].type}</p></li>
    </ul>
    `;
}

// Show by category (breakfast, dinner, drink, dessert)
function showCategory(e) {
    let filteredRecipes;
    const val = e.target.value;
    if (val === "all") {
        populateBox(recipes, box);
    } else if (val === "breakfast") {
        filteredRecipes = recipes.filter(recipe => recipe.type === "breakfast");
        populateBox(filteredRecipes, box);
    }
    else if (val === "dinner") {
        filteredRecipes = recipes.filter(recipe => recipe.type === "dinner");
        populateBox(filteredRecipes, box);
    } else if (val === "drink") {
        filteredRecipes = recipes.filter(recipe => recipe.type === "drink");
        populateBox(filteredRecipes, box);
    } else if (val === "dessert") {
        filteredRecipes = recipes.filter(recipe => recipe.type === "dessert");
        populateBox(filteredRecipes, box);
    } else populateBox(recipes, box);

}

// Sort recipes by time or difficulty
function sortRecipes(e) {
    let sortedRecipes;
    const val = e.target.value;
    if (val === "timeAsc") {
        sortedRecipes = recipes.sort((a, b) => a.time > b.time ? 1 : -1);
        populateBox(sortedRecipes, box);
    } else if (val === "timeDsc") {
        sortedRecipes = recipes.sort((a, b) => b.time > a.time ? 1 : -1);
        populateBox(sortedRecipes, box);
    }
    else if (val === "difficultyAsc") {
        const priority = ["easy", 'medium', 'difficult'];
        const sortedRecipes = recipes.sort((a, b) => {
            let firstPrio = priority.indexOf(a.level);
            let secPrio = priority.indexOf(b.level);
            return firstPrio - secPrio;
        });
        populateBox(sortedRecipes, box);
    } else if (val === "difficultyDsc") {
        const priority = ["difficult", 'medium', 'easy'];
        const sortedRecipes = recipes.sort((a, b) => {
            let firstPrio = priority.indexOf(a.level);
            let secPrio = priority.indexOf(b.level);
            return firstPrio - secPrio;
        });
        populateBox(sortedRecipes, box);
    } else populateBox(recipes, box);
}

// Delete recipe
function deleteRecipe(e) {
    let recipeTitle = "";
    const el = e.target;
    const parent = el.parentNode.parentNode;
    if (el.matches('.delete-btn')) {
        recipeTitle = parent.dataset.title;
        index = recipes.findIndex(recipe => recipe.title === recipeTitle);
        recipes.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(recipes));
        populateBox(recipes, box);
    } else return;
}

// Edit recipe
function editRecipe(e) {
    document.querySelector(".modal-body .recipe-img").innerHTML = `
    <img src="${recipes[index].img}" alt="${recipes[index].title}" />
    `;

    document.querySelector(".modal-body .recipe-content").innerHTML = `
    <form class="save-recipe">
    <div>
    <label>Title: </label>
    <input type="text" name="title" value="${recipes[index].title}"/>
    </div>
    <div>
    <label>Ingredients: </label> <input type="text" name="ingredients" value="${recipes[index].ingredients}"/>
    </div>
    <div>
    <label>How to make it: </label> <textarea>${recipes[index].description}</textarea>
    </div>
    <ul>
    <li> <label>Time: </label> <input type="number" name="time" value="${recipes[index].time}"/></li>
    <li> <label>Level: </label>
    <select name="level">
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="difficult">Difficult</option>
  </select>
  </li>
  <li> <label>Category: </label>
    <select name="category">
    <option value="breakfast">Breakfast</option>
    <option value="dessert">Dessert</option>
    <option value="dinner">Dinner</option>
    <option value="drink">Drink</option>
  </select>
  </li>
    </ul>
    <input type="submit" value="Save Recipe" />
    </form>
    </div>
    `;

    document.querySelector("input[type='submit']").addEventListener('click', saveRecipe);
}

// Save recipe
function saveRecipe(e) {
    e.preventDefault();
    const img = recipes[index].img;
    const title = document.querySelector('input[name="title"]').value;
    const ingredients = document.querySelector('input[name="ingredients"]').value;
    const description = document.querySelector('textarea').innerHTML;
    const time = document.querySelector('input[name="time"]').value;
    const level = document.querySelector('select[name="level"]').value;
    const type = document.querySelector('select[name="category"]').value;

    recipes[index] = { title, img, time, level, type, ingredients, description };
    localStorage.setItem('items', JSON.stringify(recipes));
    populateBox(recipes, box);
    document.querySelector(".save-recipe").addEventListener('click', changeEditor);
}

// Update Recipe Box
function populateBox(items, itemsList) {
    itemsList.innerHTML = items.map(recipe => `
    <div class="recipe" data-title="${recipe.title}">
    <div class="top-content">
    <button class="delete-btn">&times;</button>
    <img src="${recipe.img}" alt="${recipe.title}" />
    </div>
    <div class="info">
        <h2>${recipe.title}</h2>
        <ul>
            <li>${recipe.level}</li>
            <li>${recipe.time} min</li>
            <li>${recipe.type}</li>
        </ul>
    </div>
    </div>
    `).join('');
}

// Change modal content
function changeEditor() {
    document.querySelector(".modal-body .recipe-content").innerHTML = `
    <h2>${recipes[index].title}</h2>
    <p><span class="bold">Ingredients</span>: ${recipes[index].ingredients}</p>
    <p><span class="bold">How to make it</span>: ${recipes[index].description}</p>
    <ul>
    <li><p><span class="bold">Time</span>: ${recipes[index].time}</p></li>
    <li><p><span class="bold">Level</span>: ${recipes[index].level}</p></li>
    <li><p><span class="bold">Category</span>: ${recipes[index].type}</p></li>
    </ul>
    `;
}

/// Add Recipe
function addRecipe(e) {
    index = null;
    document.querySelector(".modal-body .recipe-img").innerHTML = `
    <img src="img/default.jpg" alt="cake" />
    `;
    document.querySelector(".modal-body .recipe-content").innerHTML = `
    <form class="save-recipe">
    <div>
    <label>Title: </label>
    <input type="text" name="title" value=""/>
    </div>
    <div>
    <label>Ingredients: </label> <input type="text" name="ingredients" value=""/>
    </div>
    <div>
    <label>How to make it: </label> <textarea></textarea>
    </div>
    <ul>
    <li> <label>Time: </label> <input type="number" name="time"/></li>
    <li> <label>Level: </label>
    <select name="level">
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="difficult">Difficult</option>
  </select>
  </li>
  <li> <label>Category: </label>
    <select name="category">
    <option value="breakfast">Breakfast</option>
    <option value="dessert">Dessert</option>
    <option value="dinner">Dinner</option>
    <option value="drink">Drink</option>
  </select>
  </li>
    <input type="submit" value="Save Recipe" />
    </form>
    </div>
    `;
    document.querySelector("input[type='submit']").addEventListener('click', saveNewRecipe);
}

let timeout;
// Save recipe
function saveNewRecipe(e) {
    e.preventDefault();
    const img = 'img/default.jpg';
    const userTitle = document.querySelector('input[name="title"]').value;
    const ingredients = document.querySelector('input[name="ingredients"]').value;
    const description = document.querySelector('textarea').innerHTML;
    const time = document.querySelector('input[name="time"]').value;
    const level = document.querySelector('select[name="level"]').value;
    const type = document.querySelector('select[name="category"]').value;

    const title = userTitle[0].toUpperCase() + userTitle.slice(1);

    if (title.length >= 3) {
        recipes.push({ title, img, time, level, type, ingredients, description });
        localStorage.setItem('items', JSON.stringify(recipes));
        populateBox(recipes, box);
        document.querySelector("#message").innerHTML = "Saved!";

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            document.querySelector("#message").innerHTML = "";
        }, 3000);
    } else {
        document.querySelector("#message").innerHTML = "Please enter at least 3 characters";
    }
}

// Open modal
function openModal(e) {
    if (e.target.matches('div #recipe-box') || (e.target.matches('.delete-btn'))) return;
    modal.style.display = "block";
    document.querySelector('body').classList.add('hide-overflow');
}

// Close modal
function closeModal() {
    modal.style.display = "none";
    document.querySelector('body').classList.remove('hide-overflow');
}

editBtn.addEventListener('click', editRecipe);
addBtn.addEventListener('click', openModal);
addBtn.addEventListener('click', addRecipe);
box.addEventListener('click', openModal);
box.addEventListener('click', displayRecipe);
box.addEventListener('click', deleteRecipe);
category.addEventListener('change', showCategory);
sortBy.addEventListener('change', sortRecipes);
closeBtn.addEventListener('click', closeModal);

createRecipeBox(recipes);


