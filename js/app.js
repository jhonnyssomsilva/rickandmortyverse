document.addEventListener("DOMContentLoaded", function () {
  const selectPersonagem = document.getElementById("botao-personagem");
  const nomePersonagem = document.getElementById("nome-personagem");
  const nomeEspecie = document.getElementById("nome-especie");
  const nomeLocalizacao = document.getElementById("nome-localizacao");
  const imagemPersonagem = document.getElementById("imagem-do-personagem");

  async function puxarTodosPersonagens() {
    let todosPersonagens = [];
    let proximaPagina = "https://rickandmortyapi.com/api/character";

    while (proximaPagina) {
      const response = await fetch(proximaPagina);
      const data = await response.json();

      todosPersonagens = todosPersonagens.concat(data.results);

      proximaPagina = data.info.next;
    }

    return todosPersonagens;
  }

  // Função para preencher o select de personagens com todos os personagens puxados
  async function preencherSelect() {
    const personagens = await puxarTodosPersonagens();

    // Limpar opções anteriores
    selectPersonagem.innerHTML = "";

    // Adicionar uma opção para cada personagem
    personagens.forEach((personagens) => {
      const option = document.createElement("option");
      option.value = personagens.id;
      option.textContent = personagens.name;
      selectPersonagem.appendChild(option);
    });

    // Atualizar as informações do primeiro personagem no card
    atualizarPersonagem(personagens[0]);
  }

  // Função para atualizar as informações do personagem no card
  function atualizarPersonagem(personagem) {
    nomePersonagem.textContent = personagem.name;
    nomeEspecie.textContent = personagem.species;
    nomeLocalizacao.textContent = personagem.location.name;
    imagemPersonagem.src = personagem.image;
  }

  // Event listener para chamar a função de preencher o select quando a página carregar
  preencherSelect();

  // Event listener para atualizar as informações quando um personagem for selecionado
  selectPersonagem.addEventListener("change", async () => {
    const idPersonagem = selectPersonagem.value;
    const personagemResponse = await fetch(
      `https://rickandmortyapi.com/api/character/${idPersonagem}`
    );
    const personagemData = await personagemResponse.json();

    // Atualizar as informações do personagem no card
    atualizarPersonagem(personagemData);
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

  async function puxarTodasLocalizacoes() {
    let todasLocalizacoes = [];
    let proximaPagina = "https://rickandmortyapi.com/api/location";

    while (proximaPagina) {
      const response = await fetch(proximaPagina);
      const data = await response.json();

      todasLocalizacoes = todasLocalizacoes.concat(data.results);

      proximaPagina = data.info.next;
    }

    return todasLocalizacoes;
  }

  // Função para preencher o select de localizações com todas as localizações obtidas
  async function preencherSelectLocalizacao() {
    const localizacoes = await puxarTodasLocalizacoes();

    // Limpar opções anteriores
    selectLocalizacao.innerHTML = "";

    // Adicionar uma opção para cada localização
    localizacoes.forEach((localizacao) => {
      const option = document.createElement("option");
      option.value = localizacao.id;
      option.textContent = localizacao.name;
      selectLocalizacao.appendChild(option);
    });
  }

  preencherSelectLocalizacao();

  selectLocalizacao.addEventListener("change", async () => {
    const idLocalizacao = selectLocalizacao.value;

    const response = await fetch(
      `https://rickandmortyapi.com/api/location/${idLocalizacao}`
    );
    const localizacaoData = await response.json();

    nomeLocalizacao.textContent = localizacaoData.name;
    nomeTipo.textContent = localizacaoData.type;
    nomeDimensao.textContent = localizacaoData.dimension;

    selectPersonagemLocalizacao.innerHTML = "";

    // Adicionar uma opção para cada personagem da localização
    localizacaoData.residents.forEach(async (residentURL) => {
      // Obter detalhes do personagem usando a URL fornecida pela API
      const personagemResponse = await fetch(residentURL);
      const personagemData = await personagemResponse.json();

      // Criar e adicionar uma opção para o personagem
      const option = document.createElement("option");
      option.value = personagemData.id;
      option.textContent = personagemData.name;
      selectPersonagemLocalizacao.appendChild(option);
    });
  });

  // Event listener para atualizar os personagens da localização quando um personagem da localização for selecionado
  selectPersonagemLocalizacao.addEventListener("change", async () => {
    const idPersonagem = selectPersonagemLocalizacao.value;

    // Solicitar os detalhes do personagem selecionado
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${idPersonagem}`
    );
    const personagemData = await response.json();

    // Atualizar as informações do personagem no card
    atualizarPersonagem(personagemData);
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

  async function puxarTodosEpisodios() {
    let todosEpisodios = [];
    let proximaPagina = "https://rickandmortyapi.com/api/episode";

    // Loop para solicitar todas as páginas até que não haja mais páginas a serem buscadas
    while (proximaPagina) {
      const response = await fetch(proximaPagina);
      const data = await response.json();

      // Adicionar os episódios desta página à lista de todos os episódios
      todosEpisodios = todosEpisodios.concat(data.results);

      // Verificar se há próxima página
      proximaPagina = data.info.next;
    }

    return todosEpisodios;
  }

  // Função para preencher o select de episódios com todos os episódios obtidos
  async function preencherSelectEpisodio() {
    const episodios = await puxarTodosEpisodios();

    // Limpar opções anteriores
    selectEpisodio.innerHTML = "";

    // Adicionar uma opção para cada episódio
    episodios.forEach((episodios) => {
      const option = document.createElement("option");
      option.value = episodios.id;
      option.textContent = episodios.name;
      selectEpisodio.appendChild(option);
    });

    updateEpisodeInfo(episodios);
  }

  // Função para atualizar as informações do episódio no card
  function atualizarInfoEpisodios(episodio) {
    nomeEpisodio.textContent = episodio.name;
    tagEpisodio.textContent = episodio.episode;
    dataEpisodio.textContent = episodio.air_date;
  }

  preencherSelectEpisodio();

  // Event listener para atualizar as informações quando um episódio for selecionado
  selectEpisodio.addEventListener("change", async () => {
    const IdEpisodio = selectEpisodio.value;
    const episodioResponse = await fetch(
      `https://rickandmortyapi.com/api/episode/${IdEpisodio}`
    );
    const episodioData = await episodioResponse.json();

    // Atualizar as informações do episódio no card
    atualizarInfoEpisodios(episodioData);

    // Limpar opções anteriores do select de personagens do episódio
    selectPersonagemEpisodio.innerHTML = "";

    // Adicionar uma opção para cada personagem do episódio
    episodioData.characters.forEach(async (characterURL) => {
      // Obter detalhes do personagem usando a URL fornecida pela API
      const personagemResponse = await fetch(characterURL);
      const personagemData = await personagemResponse.json();

      // Criar e adicionar uma opção para o personagem
      const option = document.createElement("option");
      option.value = personagemData.id;
      option.textContent = personagemData.name;
      selectPersonagemEpisodio.appendChild(option);
    });
  });
});
