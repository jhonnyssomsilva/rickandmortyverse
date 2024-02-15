document.addEventListener("DOMContentLoaded", function () {
  const selectPersonagem = document.getElementById("botao-personagem");
  const nomePersonagem = document.getElementById("nome-personagem");
  const nomeEspecie = document.getElementById("nome-especie");
  const nomeLocalizacao = document.getElementById("nome-localizacao");
  const imagemPersonagem = document.getElementById("imagem-do-personagem");

  async function getAllCharacters() {
    let allCharacters = [];
    let nextPage = "https://rickandmortyapi.com/api/character";

    // Loop para solicitar todas as páginas até que não haja mais páginas a serem buscadas
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      // Adicionar os personagens desta página à lista de todos os personagens
      allCharacters = allCharacters.concat(data.results);

      // Verificar se há próxima página
      nextPage = data.info.next;
    }

    return allCharacters;
  }

  // Função para preencher o select de personagens com todos os personagens obtidos
  async function populateCharacterSelect() {
    const characters = await getAllCharacters();

    // Limpar opções anteriores
    selectPersonagem.innerHTML = "";

    // Adicionar uma opção para cada personagem
    characters.forEach((character) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.name;
      selectPersonagem.appendChild(option);
    });

    // Atualizar as informações do primeiro personagem no card
    updateCharacterInfo(characters[0]);
  }

  // Função para atualizar as informações do personagem no card
  function updateCharacterInfo(character) {
    nomePersonagem.textContent = character.name;
    nomeEspecie.textContent = character.species;
    nomeLocalizacao.textContent = character.location.name;
    imagemPersonagem.src = character.image;
  }

  // Event listener para chamar a função de preencher o select quando a página carregar
  populateCharacterSelect();

  // Event listener para atualizar as informações quando um personagem for selecionado
  selectPersonagem.addEventListener("change", async () => {
    const characterId = selectPersonagem.value;
    const characterResponse = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );
    const characterData = await characterResponse.json();

    // Atualizar as informações do personagem no card
    updateCharacterInfo(characterData);
  });
});
