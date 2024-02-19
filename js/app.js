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

document.addEventListener("DOMContentLoaded", function () {
  const selectLocalizacao = document.getElementById("botao-localizacao");
  const selectPersonagemLocalizacao = document.getElementById(
    "botao-localizacao-personagem"
  );
  const nomeLocalizacao = document.getElementById("localizacao-localizacao");
  const nomeTipo = document.getElementById("localizacao-tipo");
  const nomeDimensao = document.getElementById("localizacao-dimensao");

  async function getAllLocations() {
    let allLocations = [];
    let nextPage = "https://rickandmortyapi.com/api/location";

    // Loop para solicitar todas as páginas até que não haja mais páginas a serem buscadas
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      // Adicionar as localizações desta página à lista de todas as localizações
      allLocations = allLocations.concat(data.results);

      // Verificar se há próxima página
      nextPage = data.info.next;
    }

    return allLocations;
  }

  // Função para preencher o select de localizações com todas as localizações obtidas
  async function populateLocationSelect() {
    const locations = await getAllLocations();

    // Limpar opções anteriores
    selectLocalizacao.innerHTML = "";

    // Adicionar uma opção para cada localização
    locations.forEach((location) => {
      const option = document.createElement("option");
      option.value = location.id;
      option.textContent = location.name;
      selectLocalizacao.appendChild(option);
    });
  }

  // Event listener para chamar a função de preencher o select de localizações quando a página carregar
  populateLocationSelect();

  // Event listener para atualizar os detalhes da localização e os personagens da localização quando uma localização for selecionada
  selectLocalizacao.addEventListener("change", async () => {
    const locationId = selectLocalizacao.value;

    // Solicitar os detalhes da localização selecionada
    const response = await fetch(
      `https://rickandmortyapi.com/api/location/${locationId}`
    );
    const locationData = await response.json();

    // Atualizar os campos com os detalhes da localização
    nomeLocalizacao.textContent = locationData.name;
    nomeTipo.textContent = locationData.type;
    nomeDimensao.textContent = locationData.dimension;

    // Limpar opções anteriores do select de personagens da localização
    selectPersonagemLocalizacao.innerHTML = "";

    // Adicionar uma opção para cada personagem da localização
    locationData.residents.forEach(async (residentURL) => {
      // Obter detalhes do personagem usando a URL fornecida pela API
      const characterResponse = await fetch(residentURL);
      const characterData = await characterResponse.json();

      // Criar e adicionar uma opção para o personagem
      const option = document.createElement("option");
      option.value = characterData.id;
      option.textContent = characterData.name;
      selectPersonagemLocalizacao.appendChild(option);
    });
  });

  // Event listener para atualizar os personagens da localização quando um personagem da localização for selecionado
  selectPersonagemLocalizacao.addEventListener("change", async () => {
    const characterId = selectPersonagemLocalizacao.value;

    // Solicitar os detalhes do personagem selecionado
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );
    const characterData = await response.json();

    // Atualizar as informações do personagem no card
    updateCharacterInfo(characterData);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const selectEpisodio = document.getElementById("botao-pesquisar-episodio");
  const selectPersonagemEpisodio = document.getElementById(
    "botao-pesquisar-personagem"
  );
  const nomeEpisodio = document.getElementById("episodio-nome");
  const tagEpisodio = document.getElementById("episodio-tag");
  const dataEpisodio = document.getElementById("episodio-data");

  async function getAllEpisodes() {
    let allEpisodes = [];
    let nextPage = "https://rickandmortyapi.com/api/episode";

    // Loop para solicitar todas as páginas até que não haja mais páginas a serem buscadas
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      // Adicionar os episódios desta página à lista de todos os episódios
      allEpisodes = allEpisodes.concat(data.results);

      // Verificar se há próxima página
      nextPage = data.info.next;
    }

    return allEpisodes;
  }

  // Função para preencher o select de episódios com todos os episódios obtidos
  async function populateEpisodeSelect() {
    const episodes = await getAllEpisodes();

    // Limpar opções anteriores
    selectEpisodio.innerHTML = "";

    // Adicionar uma opção para cada episódio
    episodes.forEach((episode) => {
      const option = document.createElement("option");
      option.value = episode.id;
      option.textContent = episode.name;
      selectEpisodio.appendChild(option);
    });

    // Atualizar as informações do primeiro episódio no card
    updateEpisodeInfo(episodes[0]);
  }

  // Função para atualizar as informações do episódio no card
  function updateEpisodeInfo(episode) {
    nomeEpisodio.textContent = episode.name;
    tagEpisodio.textContent = episode.episode;
    dataEpisodio.textContent = episode.air_date;
  }

  // Event listener para chamar a função de preencher o select quando a página carregar
  populateEpisodeSelect();

  // Event listener para atualizar as informações quando um episódio for selecionado
  selectEpisodio.addEventListener("change", async () => {
    const episodeId = selectEpisodio.value;
    const episodeResponse = await fetch(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    );
    const episodeData = await episodeResponse.json();

    // Atualizar as informações do episódio no card
    updateEpisodeInfo(episodeData);

    // Limpar opções anteriores do select de personagens do episódio
    selectPersonagemEpisodio.innerHTML = "";

    // Adicionar uma opção para cada personagem do episódio
    episodeData.characters.forEach(async (characterURL) => {
      // Obter detalhes do personagem usando a URL fornecida pela API
      const characterResponse = await fetch(characterURL);
      const characterData = await characterResponse.json();

      // Criar e adicionar uma opção para o personagem
      const option = document.createElement("option");
      option.value = characterData.id;
      option.textContent = characterData.name;
      selectPersonagemEpisodio.appendChild(option);
    });
  });
});
