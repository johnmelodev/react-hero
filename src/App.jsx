import { useState, useEffect, useRef, useReducer } from "react";

const initialStories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT": // A: Novo caso para inicializar a busca de histórias.
      return {
        ...state,
        isLoading: true, // A: Define o estado de carregamento como verdadeiro.
        isError: false, // A: Garante que não haja erro ao iniciar a busca.
      };
    case "STORIES_FETCH_SUCCESS": // B: Novo caso para sucesso na busca de histórias.
      return {
        ...state,
        isLoading: false, // B: Desativa o estado de carregamento após sucesso.
        isError: false, // B: Garante que não haja erro após sucesso.
        data: action.payload, // B: Atualiza os dados com as histórias recebidas.
      };
    case "STORIES_FETCH_FAILURE": // C: Novo caso para falha na busca de histórias.
      return {
        ...state,
        isLoading: false, // C: Desativa o estado de carregamento após falha.
        isError: true, // C: Define o estado de erro como verdadeiro.
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          // D: Alteração para operar sobre `state.data`.
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false } // E: Estado inicial agora é um objeto complexo.
  );

  useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" }); // F: Inicializa a busca de histórias.

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.stories, // G: Atualiza os dados com as histórias recebidas.
        });
      })
      .catch(
        () => dispatchStories({ type: "STORIES_FETCH_FAILURE" }) // H: Trata falhas na busca.
      );
  }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter(
    (
      story // I: Acesso aos dados via `stories.data`.
    ) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {/* J: Verifica erro diretamente no estado unificado.*/}

      {stories.isLoading ? (
        <p>Loading ...</p> // K: Verifica carregamento diretamente no estado unificado.
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default App;
