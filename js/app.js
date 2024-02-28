document.addEventListener("DOMContentLoaded", function () {
  const selectPersonagem = document.getElementById("botao-personagem");
  const selectLocalizacao = document.getElementById("botao-localizacao");
  const selectEpisodio = document.getElementById("botao-pesquisar-episodio");
  const selectPersonagemLocalizacao = document.getElementById(
    "botao-localizacao-personagem"
  );
  const selectPersonagemEpisodio = document.getElementById(
    "botao-pesquisar-personagem"
  );
  const nomePersonagem = document.getElementById("nome-personagem");
  const nomeEspecie = document.getElementById("nome-especie");
  const nomeLocalizacao = document.getElementById("nome-localizacao");
  const imagemPersonagem = document.getElementById("imagem-do-personagem");
  const nomeLocalizacaoLocalizacao = document.getElementById(
    "localizacao-localizacao"
  );
  const nomeTipo = document.getElementById("localizacao-tipo");
  const nomeDimensao = document.getElementById("localizacao-dimensao");
  const nomeEpisodio = document.getElementById("episodio-nome");
  const tagEpisodio = document.getElementById("episodio-tag");
  const dataEpisodio = document.getElementById("episodio-data");

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

  async function preencherSelect() {
    const personagens = await puxarTodosPersonagens();

    selectPersonagem.innerHTML = "";
    selectPersonagemLocalizacao.innerHTML = "";
    selectPersonagemEpisodio.innerHTML = "";

    personagens.forEach((personagens) => {
      const option = document.createElement("option");
      option.value = personagens.id;
      option.textContent = personagens.name;
      selectPersonagem.appendChild(option);
      selectPersonagemLocalizacao.appendChild(option.cloneNode(true));
      selectPersonagemEpisodio.appendChild(option.cloneNode(true));
    });

    atualizarPersonagem(personagens[0]);
  }

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

  async function preencherSelectLocalizacao() {
    const localizacoes = await puxarTodasLocalizacoes();

    selectLocalizacao.innerHTML = "";

    localizacoes.forEach(async (localizacao) => {
      const response = await fetch(localizacao.url);
      const localizacaoData = await response.json();

      if (localizacaoData.residents.length > 0) {
        const option = document.createElement("option");
        option.value = localizacao.id;
        option.textContent = localizacao.name;
        selectLocalizacao.appendChild(option);
      }
    });
  }

  async function puxarTodosEpisodios() {
    let todosEpisodios = [];
    let proximaPagina = "https://rickandmortyapi.com/api/episode";

    while (proximaPagina) {
      const response = await fetch(proximaPagina);
      const data = await response.json();

      todosEpisodios = todosEpisodios.concat(data.results);

      proximaPagina = data.info.next;
    }

    return todosEpisodios;
  }

  async function preencherSelectEpisodio() {
    const episodios = await puxarTodosEpisodios();

    selectEpisodio.innerHTML = "";

    episodios.forEach((episodios) => {
      const option = document.createElement("option");
      option.value = episodios.id;
      option.textContent = episodios.name;
      selectEpisodio.appendChild(option);
    });

    updateEpisodeInfo(episodios);
  }

  function atualizarPersonagem(personagem) {
    nomePersonagem.textContent = personagem.name;
    nomeEspecie.textContent = personagem.species;
    nomeLocalizacao.textContent = personagem.location.name;
    imagemPersonagem.src = personagem.image;

    // Atualizar o nome do personagem na botao-personagem
    selectPersonagem.value = personagem.id;
  }

  function atualizarInfoLocalizacao(localizacao) {
    nomeLocalizacaoLocalizacao.textContent = localizacao.name;
    nomeTipo.textContent = localizacao.type;
    nomeDimensao.textContent = localizacao.dimension;
  }

  function atualizarInfoEpisodios(episodio) {
    nomeEpisodio.textContent = episodio.name;
    tagEpisodio.textContent = episodio.episode;
    dataEpisodio.textContent = episodio.air_date;
  }

  preencherSelect();
  preencherSelectLocalizacao();
  preencherSelectEpisodio();

  selectPersonagem.addEventListener("change", async () => {
    const idPersonagem = selectPersonagem.value;
    const personagemResponse = await fetch(
      `https://rickandmortyapi.com/api/character/${idPersonagem}`
    );
    const personagemData = await personagemResponse.json();

    atualizarPersonagem(personagemData);
  });

  selectLocalizacao.addEventListener("change", async () => {
    const idLocalizacao = selectLocalizacao.value;

    const response = await fetch(
      `https://rickandmortyapi.com/api/location/${idLocalizacao}`
    );
    const localizacaoData = await response.json();

    atualizarInfoLocalizacao(localizacaoData);
  });

  selectEpisodio.addEventListener("change", async () => {
    const IdEpisodio = selectEpisodio.value;
    const episodioResponse = await fetch(
      `https://rickandmortyapi.com/api/episode/${IdEpisodio}`
    );
    const episodioData = await episodioResponse.json();

    atualizarInfoEpisodios(episodioData);
  });

  selectPersonagemLocalizacao.addEventListener("change", async () => {
    const idPersonagem = selectPersonagemLocalizacao.value;

    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${idPersonagem}`
    );
    const personagemData = await response.json();

    atualizarPersonagem(personagemData);
  });

  selectPersonagemEpisodio.addEventListener("change", async () => {
    const idPersonagem = selectPersonagemEpisodio.value;

    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${idPersonagem}`
    );
    const personagemData = await response.json();

    atualizarPersonagem(personagemData);
  });
});
