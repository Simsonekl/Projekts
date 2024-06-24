import styled from "styled-components";
import React, { useState } from "react";
import Axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #ffdcd1; /* Kolor tła dostosowany do deserów */
  color: black; /* Kolor tekstu zmieniony na czarny */
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppNameComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AppIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 2px;
`;

const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: #fff9eb; /* Tło pola wyszukiwania zmienione na kremowe */
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const RecipeList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
  gap: 30px;
`;

const Image = styled.div`
  height: 180px;
`;

const RecipeName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

const Ingredients = styled.div`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  margin: 10px 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 3px;
  color: green;
  text-align: center;
`;

const MoreText = styled.div`
  font-size: 18px;
  border: solid 1px red;
  color: black;
  margin: 10px 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 3px;
  color: red;
  text-align: center;
`;

const RecipeComponent = (props) => {
  const { recipeObj } = props;

  return (
    <RecipeList>
      <RecipeContainer>
        <img src={recipeObj.image} alt="Avatar" />
        <RecipeName> {recipeObj.label}</RecipeName>
        <Ingredients> Ingredients </Ingredients>
        <MoreText onClick={() => window.open(recipeObj.url)}> See More </MoreText>
      </RecipeContainer>
    </RecipeList>
  );
};

function App() {
  const [timeoutID, updateTimeoutID] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=fcc7bbfb&app_key=befe4c257bf6d3a971e1103540f23972`);
    updateRecipeList(response.data.hits);
  };

  const textChange = (event) => {
    clearTimeout(timeoutID);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 400);
    updateTimeoutID(timeout);
  };

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="/recipes-svgrepo-com.svg" />
          Delicje Szymona {/* Zmieniona nazwa aplikacji */}
        </AppNameComponent>

        <SearchComponent>
          <img src="/search-icon.svg" alt="search" />
          <SearchInput placeholder="szukaj przepisu" onChange={textChange} />
        </SearchComponent>
      </Header>

      <RecipeList>
        {recipeList.length &&
          recipeList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          ))}
      </RecipeList>
    </Container>
  );
}

export default App;
