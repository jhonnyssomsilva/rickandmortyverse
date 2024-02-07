const fetch = require("node-fetch");
const fs = require("fs");

const fetchCharacters = async (page) => {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getAllCharacters = async () => {
  const characters = [];
  for (let page = 1; page <= 42; page++) {
    const charactersData = await fetchCharacters(page);
    characters.push(...charactersData.results);
  }
  return characters;
};

const saveCharactersToFile = async (characters) => {
  try {
    const filename = "personagens.json";
    const filePath = `./personagens/${filename}`;
    fs.writeFileSync(filePath, JSON.stringify(characters, null, 2));
    console.log("Dados gravados com sucesso no arquivo personagens.json");
  } catch (error) {
    console.error("Erro ao gravar os dados no arquivo:", error);
  }
};

getAllCharacters().then(saveCharactersToFile);
