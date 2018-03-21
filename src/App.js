import React, { Component } from "react";
import "./App.css";
import RecipeItem from "./components/RecipeItem";

class App extends Component {
  constructor(props) {
    super(props);

    // Expand localStorage to handle objects
    Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
    };
    Storage.prototype.getObject = function(key) {
      return JSON.parse(this.getItem(key));
    };

    // set up default empty object if none present
    if (!localStorage.getObject("_user_recipes")) {
      localStorage.setObject("_user_recipes", {});
    }

    // initialize state
    this.state = {
      recipes: localStorage.getObject("_user_recipes"),
      currentRecipeName: "",
      currentRecipeIngredients: "",
      addOrEdit: "add",
      recipeBeingEdited: ""
    };
  }

  addRecipe(e) {
    e.preventDefault();

    if (
      this.state.currentRecipeIngredients.length > 0 &&
      this.state.currentRecipeName.length > 0
    ) {
      let {
        currentRecipeIngredients,
        currentRecipeName,
        recipeBeingEdited,
        recipes
      } = this.state;

      // update localStorage
      let localRecipes = localStorage.getObject("_user_recipes");
      if (recipeBeingEdited !== currentRecipeName) {
        delete localRecipes[recipeBeingEdited];
        delete recipes[recipeBeingEdited];
      }
      localRecipes[currentRecipeName] = currentRecipeIngredients;
      localStorage.setObject("_user_recipes", localRecipes);

      // update React state
      recipes[currentRecipeName] = currentRecipeIngredients;
      this.setState({
        recipes,
        currentRecipeName: "",
        currentRecipeIngredients: "",
        addOrEdit: "add"
      });
    }
  }

  editRecipe(i) {
    let { recipes } = this.state;
    let recipeName = Object.keys(recipes)[i];
    let recipeIngredients = recipes[recipeName];
    this.setState({
      currentRecipeIngredients: recipeIngredients,
      currentRecipeName: recipeName,
      addOrEdit: "edit",
      recipeBeingEdited: recipeName
    });
  }

  deleteRecipe(i) {
    // React State
    let { recipes } = this.state;
    let recipeName = Object.keys(recipes)[i];
    delete recipes[recipeName];

    localStorage.setObject("_user_recipes", recipes);
    this.setState({
      recipes,
      currentRecipeIngredients: "",
      currentRecipeName: ""
    });
  }

  render() {
    return (
      <div id="main">
        <h1>Recipe Box</h1>
        <form id="recipeForm">
          <label htmlFor="recipeName">Recipe Name:</label>
          <input
            type="text"
            name="recipeName"
            value={this.state.currentRecipeName}
            onChange={e => this.setState({ currentRecipeName: e.target.value })}
            placeholder="Margherita Pizza"
            autoFocus
          />
          <label htmlFor="recipeIngredients">Recipe Ingredients:</label>
          <textarea
            type="text"
            name="recipeIngredients"
            value={this.state.currentRecipeIngredients}
            placeholder="Dough, tomatoes, mozzarella, basil, oregano, salt, love"
            rows="5"
            onChange={e =>
              this.setState({ currentRecipeIngredients: e.target.value })
            }
          />
          <button onClick={e => this.addRecipe(e)} id="addRecipe">
            {this.state.addOrEdit === "add" ? "Add Recipe" : "Edit Recipe"}
          </button>
        </form>

        <div id="recipeList">
          {Object.keys(localStorage.getObject("_user_recipes")).map(
            (item, i) => (
              <RecipeItem
                item={item}
                i={i}
                key={i}
                deleteRecipe={this.deleteRecipe.bind(this)}
                editRecipe={this.editRecipe.bind(this)}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
