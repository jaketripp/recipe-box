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
      currentRecipeIngredients: ""
    };
  }

  addRecipe(e) {
    e.preventDefault();

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
      currentRecipeIngredients: ""
    });
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
          <button onClick={e => this.addRecipe(e)}>Add Recipe</button>
        </form>
        {Object.keys(localStorage.getObject("_user_recipes")).map((item, i) => (
          <div className="recipe-item" key={i}>
            <div className="recipe-name">{item}</div>
            <div className="recipe-icons">
              <Edit />
              <Trash onClick={() => console.log(item)} />
            </div>
            <ul className="ingredients">
              <li>{localStorage.getObject("_user_recipes")[item]}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
