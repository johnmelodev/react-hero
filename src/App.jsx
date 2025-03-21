import * as React from "react";
import axios from "axios";

const storiesReducer = (state, action) => {
  // Reducer continua igual ao código 1.
};

const useStorageState = (key, initialState) => {
  // Hook customizado continua igual ao código 1.
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // Alteração A: Refatoração para async/await
  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" }); // Inicializa o estado de carregamento.

    try {
      // Bloco try/catch adicionado (Alteração B).
      const result = await axios.get(url); // Alteração C: Substituição do .then() pelo await.

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      }); // Manipula o sucesso da requisição.
    } catch {
      // Alteração D: Substituição do .catch() pelo bloco catch.
      dispatchStories({ type: "STORIES_FETCH_FAILURE" }); // Trata o erro caso ocorra.
    }
  }, [url]); // Dependências mantidas iguais.

  React.useEffect(() => {
    handleFetchStories(); // Chama a função de busca de histórias.
  }, [handleFetchStories]); // Depende da função atualizada.

  const handleRemoveStory = (item) => {
    // Função para remover uma história continua igual ao código 1.
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value); // Atualiza o termo de pesquisa.
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`); // Atualiza a URL com o novo termo de pesquisa.
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

// Componentes InputWithLabel, List e Item continuam iguais ao código 1.
