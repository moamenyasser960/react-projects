import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

const API_KEY = "Your API"; // Replace with your API key for recipe search

function decodeHTMLEntities(str) {
  let string = str.replaceAll(/<ol>|<\/ol>|<\/li>/g, "").split("<li>");

  return (
    <ol className="text-gray-700 list-inside list-decimal">
      {string.map((item, index) => item && <li key={index}>{item}</li>)}
    </ol>
  );
}

function RecipeDetails({ recipe, onHide }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full p-4 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg overflow-auto max-h-full shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{recipe.title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onHide}
          >
            <FaRegTimesCircle className="w-6 h-6" />
          </button>
        </div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="mb-4 rounded-lg m-auto"
        />
        <p className="text-gray-700 mb-4">
          {recipe.summary.replace(/(<([^>]+)>)/gi, "")}
        </p>
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-4">
          {recipe.extendedIngredients.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item.original}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        {decodeHTMLEntities(recipe.instructions)}
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.object,
  onHide: PropTypes.func.isRequired,
};

function RecipeCard({ recipe, onClick }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg flex flex-col transition-transform transform hover:scale-105">
      <img
        src={recipe.image}
        className="w-full h-48 object-cover"
        alt={recipe.title}
      />
      <div className="p-4 flex flex-col items-center justify-between flex-1">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => onClick(recipe)}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

function RecipeApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=10&apiKey=${API_KEY}`
      );
      setRecipes(response.data.results);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
      setRecipes([]);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch recipe details. Please try again later.");
      setSelectedRecipe(null);
    }
  };

  const handleRecipeClick = (recipe) => {
    fetchRecipeDetails(recipe.id);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 py-8"
    >
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">
          Recipe Search App
        </h1>
        <div className="flex items-center justify-center mb-6">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none w-full max-w-lg"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
            onClick={handleSearch}
          >
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={handleRecipeClick}
            />
          ))}
        </div>
        {selectedRecipe && (
          <RecipeDetails recipe={selectedRecipe} onHide={handleCloseDetails} />
        )}
      </div>
    </div>
  );
}

export default RecipeApp;
