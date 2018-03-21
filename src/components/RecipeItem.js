import React, { Component } from "react";
const Edit = require("react-icons/lib/fa/edit");
const Trash = require("react-icons/lib/fa/trash");

class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  toggleVisibilty() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  render(props) {
    const { i, item, editRecipe, deleteRecipe } = this.props;
    return (
      <div className="recipe" key={i}>
        <div className="top">
          <div
            className="recipe-name"
            onClick={this.toggleVisibilty.bind(this)}
          >
            {item}
          </div>
          <div className="recipe-icons">
            <Edit
              className="edit-icon"
              onClick={() => {
                editRecipe(i);
                this.toggleVisibilty();
              }}
            />
            <Trash className="trash-icon" onClick={() => deleteRecipe(i)} />
          </div>
        </div>
        <div className={this.state.hidden ? "bottom hide" : "bottom"}>
          <ul className="ingredients">
            {localStorage
              .getObject("_user_recipes")
              [item].split(", ")
              .map((ingredient, j) => <li key={j}>{ingredient}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default RecipeItem;
