import styled from "styled-components";
import React, { useState } from "react";
import Axios from "axios";
import searchIcon from './images/ikona wyszukiwania.png';
import appIcon from './images/czapka2.png'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  background-color: #1F2E2B; /* Kolor tła dostosowany do deserów */
  color: #f9c6cf; /* Kolor tekstu zmieniony na różowy */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppNameComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px; /* Odstęp między nazwą aplikacji a paskiem wyszukiwania */
`;

const AppIcon = styled.img` 
  width: 36px;
  height: 36px;
  margin: 2px;
`;

const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 6px;
  background-color: #ffffff; /* Tło pola wyszukiwania zmienione na białe */
  width: 50%; /* Szerokość pola wyszukiwania */
  max-width: 600px; /* Maksymalna szerokość pola wyszukiwania */
  box-shadow: 0 3px 6px 0 #aaa; /* Dodanie cienia dla lepszego wyglądu */
  align-items: center; /* Wycentrowanie zawartości w pionie */
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
  flex-grow: 1;
`;

const RecipeList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  width: 100%;
  max-width: 1200px;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
  margin: 20px;
  border-radius: 8px;
  background-color: #fff;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecipeName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

const Button = styled.div`
  font-size: 18px;
  border: solid 1px ${props => props.color};
  color: ${props => props.color};
  margin: 10px 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 3px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.color};
    color: white;
  }
`;

const RecipeComponent = (props) => {
  const { recipeObj } = props;

  return (
    <RecipeContainer>
      <Image src={recipeObj.image} alt="Avatar" />
      <RecipeName>{recipeObj.label}</RecipeName>
      <Button color="green">Ingredients</Button>
      <Button color="red" onClick={() => window.open(recipeObj.url)}>See More</Button>
    </RecipeContainer>
  );
};

function App() {
  const [timeoutID, updateTimeoutID] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    try {
      const response = await Axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=fcc7bbfb&app_key=befe4c257bf6d3a971e1103540f23972`);
      updateRecipeList(response.data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
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
          <AppIcon src={appIcon} /> {/* Użycie poprawionego importu */}
          Delicje Szymona 
        </AppNameComponent>

        <SearchComponent>
          <SearchIcon src={searchIcon} alt="search" />
          <SearchInput placeholder="szukaj przepisu" onChange={textChange} />
        </SearchComponent>
      </Header>

      <RecipeList>
        {recipeList.length > 0 &&
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          ))}
      </RecipeList>
    </Container>
  );
}

export default App;
