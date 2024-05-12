import RecipeCardComponent from './RecipeCard';
import RecipesPagination from './RecipesPagination';

function RecipesComponent({ recipes, skipPage, limitPage }) {
  let { recipes: recipesData, total } = recipes

  if (!recipesData) {
    return (<p>Загрузка...</p>)
  }
  return recipesData && (
    <div className='recipes'>
      <div className='recipes-header'>
        <h2 className='recipes-header-title'>Найденные рецепты <span>{total}</span></h2>
      </div>
      <div className='recipes-body'>
        <div className='recipes-items'>
          {recipesData.map((recipe, recipeKey) => <RecipeCardComponent key={recipeKey} data={recipe} />)}
        </div>
        {total > 6 && <RecipesPagination total={total} skip={skipPage} limit={limitPage} />}
      </div>
    </div>
  );
}

export default RecipesComponent;