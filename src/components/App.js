import React, { Component } from "react";
import "../App.css";
import RecipeItem from "./RecipeItem";

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Recipe Box</h1>
        <RecipeItem />
      </div>
    );
  }
}

export default App;
