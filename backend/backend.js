const axios = require("axios");
const fs = require("fs");

async function getCharacters(page) {
  try {
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao obter os personagens:", error);
    return [];
  }
}

async function getAllCharacters() {
  let allCharacters = [];
  let page = 1;
  let characters = await getCharacters(page);

  while (characters.length > 0) {
    allCharacters = allCharacters.concat(characters);
    page++;
    characters = await getCharacters(page);
  }

  return allCharacters;
}

async function generateCharacterJson() {
  const characters = await getAllCharacters();
  const characterJson = JSON.stringify(characters, null, 2);

  try {
    fs.writeFileSync("backend/rickmorty_characters.json", characterJson);
    console.log("Arquivo JSON gerado com sucesso.");
  } catch (error) {
    console.error("Erro ao salvar o arquivo JSON:", error);
  }
}

generateCharacterJson();
