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
  const data = JSON.stringify(characters);
  const filename = "personagens.json";
  const file = new File([data], filename, { type: "application/json" });
  await saveAs(file);
};

getAllCharacters().then(saveCharactersToFile);
