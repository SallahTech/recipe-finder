import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // if (!id) return;

    // 1) Loading recipe
    recipeView.renderASpinner();

    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(`${err} 💥💥💥💥💥`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderASpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (error) {
    console.error(`${error} 💥💥💥💥💥`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
