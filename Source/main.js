// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  const str = localStorage.getItem("recipes");
  return JSON.parse(str);
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  
  // A10. TODO - Get a reference to the <main> element
  const main = document.querySelector("main");
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  if(recipes==null) return;
  for(let i =0; i<recipes.length;i++){
    const temp = document.createElement('recipe-card');
    temp.data=recipes[i];
    main.appendChild(temp);
  }
  
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  
  const str = recipes.toString();
  console.log(localStorage.recipes);
  localStorage.recipes=str;
  
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  
  
  // B2. TODO - Get a reference to the <form> element
  const fm = document.getElementById("new-recipe");
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
   // Steps B4-B9 will occur inside the event listener from step B3
  fm.addEventListener('submit', (event) => {
    event.preventDefault();
    // B4. TODO - Create a new FormData object from the <form> element reference above
    const fd = new FormData(fm);
    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    const recipeObject=new Object();
    for (const pair of fd.entries()) {
      recipeObject[pair[0]]=pair[1];
    }
    
    
    // B6. TODO - Create a new <recipe-card> element
    const temp = document.createElement('recipe-card');
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    temp.data = recipeObject;
    // B8. TODO - Append this new <recipe-card> to <main>
    document.querySelector("main").appendChild(temp);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    console.log(localStorage.getItem("recipe"));
  });
    // B10. TODO - Get a reference to the "Clear Local Storage" button
    // B11. TODO - Add a click event listener to clear local storage button
    const clrButton = document.getElementsByClassName("danger")[0];
    console.log(typeof(clrButton));
    clrButton.addEventListener('click', (event)=>{
      console.log("clear");
      localStorage.clear();
      document.querySelector("main").innerHTML='';
    });
}