import React, { useEffect, useState } from 'react'
import { fetchCuisines, fetchMealTypes, fetchRecipe } from '../../api/recipesApi';
import FilterForm from '../form/FilterForm';

function RecipesSearchComponent({ handleRecipes, recipes }) {

  const [cuisines, setCuisines] = useState(null);
  const [mealTypes, setMealTypes] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);

  const difficultButtons = [
    { label: 'Любая', isActive: true, isDisabled: false, value: 'all' },
    { label: 'Низкая', isActive: false, isDisabled: false, value: 'Easy' },
    { label: 'Средняя', isActive: false, isDisabled: false, value: 'Medium' },
    { label: 'Высокая', isActive: false, isDisabled: true, value: 'Hard' },
  ]

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        let id = Math.floor(Math.random() * recipes.total);
        const recipesData = await fetchRecipe(id || 1);
        setRandomRecipe(recipesData);
      } catch (error) {
        console.error(error);
      }
    };

    if (randomRecipe) {
      fetchRandomRecipe();
    }
  }, [randomRecipe, recipes.total]);

  useEffect(() => {
    const fetchCuisinesData = async () => {
      try {
        const cuisinesData = await fetchCuisines();
        setCuisines(cuisinesData);
      } catch (error) {
        console.error(error);
      }
    };

    if (!cuisines) {
      fetchCuisinesData();
    }
  }, [cuisines]);

  useEffect(() => {
    const fetchMealTypesData = async () => {
      try {
        const mealTypesData = await fetchMealTypes();
        setMealTypes(mealTypesData);
      } catch (error) {
        console.error(error);
      }
    };

    if (!mealTypes) {
      fetchMealTypesData();
    }
  }, [mealTypes]);

  const generateRandomRecipe = () => {
    const data = {
      recipes: [randomRecipe],
      total: recipes.total,
      skip: 0,
      limit: 1
    }

    handleRecipes(data);
  }

  if (!recipes) {
    return;
  }

  return (
    <div className='recipes-search'>
      <div className='recipes-search-header'>
        <div className='recipes-search-image'>
          <img src='/images/form_search_bg.webp' alt='backgroundg food' />
        </div>
        <div className='recipes-search-text'>
          <p>В нашей жизни, когда время становится все более ценным ресурсом, задача планирования приема пищи становится все более сложной.</p>
          <p>Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или ужин? Каким образом мы можем легко и быстро определиться с выбором блюда и не тратить много времени на принятие этого решения?</p>
          <p>Наш сервис поможет: выбирайте параметры - и вперед!</p>
        </div>
      </div>
      <FilterForm cuisines={cuisines} mealTypes={mealTypes} difficultButtons={difficultButtons} handleRecipes={handleRecipes} recipes={recipes} />
      {/* <form className='recipes-search-body' method='post'>
        <div className='form-row'>
          <label>Кухня:</label>
          {cuisines && <Dropdown title="Все страны и регионы" options={cuisines} name='cuisine' />}
        </div>
        <div className='form-row'>
          <label>Тип блюда:</label>
          {mealTypes && <Dropdown title="Все типы" options={mealTypes} name='meal-type' />}
        </div>
        <div className='form-row'>
          <label>Сложность приготовления:</label>
          <RadioButtonGroup options={difficultButtons} />
        </div>
        <Link to='/' className='form-reset'>Сбросить все фильтры</Link>
      </form> */}
      <div className='recipes-search-footer'>
        <p>А еще можно попробовать на вкус удачу</p>
        <button type='button' className='form-generator' onClick={generateRandomRecipe}>Мне повезет</button>
      </div>

    </div>
  )
}

export default RecipesSearchComponent;