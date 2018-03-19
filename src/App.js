import React, { Component } from "react";
import "./App.css";
const Edit = require("react-icons/lib/fa/edit");
const Trash = require("react-icons/lib/fa/trash");

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
      addOrEdit: "add"
    };
  }

  addRecipe(e) {
    e.preventDefault();

    if (
      this.state.currentRecipeIngredients.length > 0 &&
      this.state.currentRecipeName.length > 0
    ) {
      let { currentRecipeIngredients, currentRecipeName, recipes } = this.state;

      // update localStorage
      let localRecipes = localStorage.getObject("_user_recipes");
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
      addOrEdit: "edit"
    });
  }

  deleteRecipe(i) {
    // React State
    let { recipes } = this.state;
    let recipeName = Object.keys(recipes)[i];
    delete recipes[recipeName];

    localStorage.setObject("_user_recipes", recipes);
    this.setState({ recipes });
  }

  render() {
    return (
      <div id="main">
        <h1>Recipe Box</h1>
        <form>
          <label htmlFor="recipeName">Recipe Name:</label>
          <input
            type="text"
            name="recipeName"
            value={this.state.currentRecipeName}
            onChange={e => this.setState({ currentRecipeName: e.target.value })}
            autoFocus
          />
          <label htmlFor="recipeIngredients">Recipe Ingredients:</label>
          <input
            type="text"
            name="recipeIngredients"
            value={this.state.currentRecipeIngredients}
            onChange={e =>
              this.setState({ currentRecipeIngredients: e.target.value })
            }
          />
          <button onClick={e => this.addRecipe(e)}>
            {this.state.addOrEdit === "add" ? "Add Recipe" : "Edit Recipe"}
          </button>
        </form>
        {Object.keys(localStorage.getObject("_user_recipes")).map((item, i) => (
          <div className="recipe-item" key={i}>
            <div className="recipe-name">{item}</div>
            <div className="recipe-icons">
              <Edit onClick={() => this.editRecipe(i)} />
              <Trash onClick={() => this.deleteRecipe(i)} />
            </div>
            <ul className="ingredients">
              {localStorage
                .getObject("_user_recipes")
                [item].split(", ")
                .map((ingredient, j) => <li key={j}>{ingredient}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
