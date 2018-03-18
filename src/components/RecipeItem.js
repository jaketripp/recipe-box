import React, { Component } from "react";
const Edit = require("react-icons/lib/fa/edit");
const Trash = require("react-icons/lib/fa/trash");

class RecipeItem extends Component {
  render() {
    const recipeName = "Pizza";
    // const ingredients = ["dough", "tomatoes", "mozzarella"];
    return (
      <div className="recipe-item">
        <div className="recipe-name">{recipeName}</div>
        <div className="recipe-icons">
          <Edit />
          <Trash onClick={() => console.log(recipeName)} />
        </div>
        <ul className="ingredients">
          <li>Dough</li>
          <li>Tomatoes</li>
          <li>Mozzarella</li>
        </ul>
      </div>
    );
  }
}

export default RecipeItem;
