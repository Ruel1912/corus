import React, { useEffect, useState } from 'react';
import RadioButtonGroup from './RadioButtonGroup';
import Dropdown from './Dropdown';
import { fetchRecipes, findByMealType } from '../../api/recipesApi';

const FilterForm = ({ cuisines, mealTypes, difficultButtons, handleRecipes, recipes }) => {
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [allRecipes, setAllRecipes] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficultButtons.find(option => option.isActive).value);

  useEffect(() => {
    const fetchAllRecipesData = async () => {
      try {
        const recipesData = await fetchRecipes(1000, 0);
        setAllRecipes(recipesData);
      } catch (error) {
        console.error(error);
      }
    };

    !allRecipes && fetchAllRecipesData();

  }, [allRecipes]);

  const handleCuisineChange = (option) => {
    setSelectedCuisine(option === 'Все страны и регионы' ? 'all' : option);
    handleSubmit(option, selectedMealType, selectedDifficulty);
  }

  const handleMealTypeChange = (option) => {
    setSelectedMealType(option === 'Все типы' ? 'all' : option);
    handleSubmit(selectedCuisine, option, selectedDifficulty);
  };

  const handleDifficultyChange = (option) => {
    setSelectedDifficulty(option.value);
    handleSubmit(selectedCuisine, selectedMealType, option);
  };

  const handleReset = () => {

  }

  const getFilteredRecipesByMealType = async (mealType) => {
    if (mealType === 'all') {
      return [];
    }

    try {
      const recipesByMealTypes = await findByMealType(mealType);
      return recipesByMealTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getFilteredRecipesByDifficult = async (diffcult) => {
    if (diffcult === 'all') {
      return [];
    }

    // try {
    // const recipesByMealTypes = await fetchRecipes(recipes.total, 0);
    // return recipesByMealTypes;
    // } catch (error) {
    // console.error(error);
    // return [];
    // }
  }

  const handleSubmit = async (selectedCuisine, selectedMealType, selectedDifficulty) => {
    // console.log(allRecipes);/
    
    
    if (selectedCuisine === 'all' || selectedMealType === 'all' || selectedDifficulty === 'all') {
      allRecipes.limit = 6;
      handleRecipes(allRecipes);
      return;
    }

    // let responseRecipes = allRecipes.recipes;
    // const allRecipes = await getAllRecipes();
    // console.log(selectedDifficulty);
    // try {
    // let filteredMealTypes = await getFilteredRecipesByMealType(selectedMealType);
    // let filteredDifficult = await getFilteredRecipesByDifficult(selectedDifficulty);
    // debugger;
    // filteredDifficult = filteredDifficult.recipes && filteredDifficult.recipes.filter(recipe => recipe.diffculty === selectedDifficulty);
    // console.log(filteredDifficult);
    // if (filteredMealTypes.recipes) {
    // let data = {
    // recipes: filteredMealTypes.recipes,
    // total: recipes.total,
    // skip: 0,
    // limit: 6,
    // }

    // handleRecipes(data);
  // }

  // } catch (error) {
  // console.error(error);
  // }
};

return (
  <form className='recipes-search-body' onSubmit={handleSubmit}>
    <div className='form-row'>
      <label>Кухня:</label>
      {cuisines && <Dropdown title="Все страны и регионы" options={cuisines} name='cuisine' handleSelect={handleCuisineChange} />}
    </div>
    <div className='form-row'>
      <label>Тип блюда:</label>
      {mealTypes && <Dropdown title="Все типы" options={mealTypes} name='meal-type' handleSelect={handleMealTypeChange} />}
    </div>
    <div className='form-row'>
      <label>Сложность приготовления:</label>
      <RadioButtonGroup options={difficultButtons} handleDifficultyChange={handleDifficultyChange} selected={selectedDifficulty} />
    </div>
    <div className='form-row'>
      <button className='form-reset' type='button' onClick={handleReset}>Сбросить все фильтры</button>
      <button className='form-submit' type='submit'>Применить фильтры</button>
    </div>
  </form>
);
};

export default FilterForm;
