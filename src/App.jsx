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
  // A: Introduzimos uma função reducer para gerenciar as transições de estado.
  switch (action.type) {
    case "SET_STORIES": // A: O tipo 'SET_STORIES' define como o estado deve ser atualizado quando novas histórias são definidas.
      return action.payload; // A: O novo estado é simplesmente o payload da ação.
    case "REMOVE_STORY": // A: O tipo 'REMOVE_STORY' define como remover uma história do estado.
      return state.filter(
        (story) => action.payload.objectID !== story.objectID // A: Filtra o estado atual para excluir a história com o ID correspondente.
      );
    default:
      throw new Error(); // A: Se o tipo da ação não for reconhecido, lança um erro para lembrar que a implementação não está coberta.
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
    // B: Substituímos useState por useReducer para gerenciar o estado stories.
    storiesReducer,
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          // C: Em vez de usar setStories, usamos dispatchStories para enviar uma ação ao reducer.
          type: "SET_STORIES", // C: O tipo da ação indica que estamos definindo as histórias.
          payload: result.data.stories, // C: O payload contém os dados das histórias a serem definidos como estado.
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({
      // D: Em vez de calcular o novo estado diretamente aqui, enviamos uma ação ao reducer.
      type: "REMOVE_STORY", // D: O tipo da ação indica que estamos removendo uma história.
      payload: item, // D: O payload contém a história a ser removida.
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
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

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
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
