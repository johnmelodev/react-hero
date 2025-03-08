import { useState, useEffect } from "react";

// A: Custom Hook useStorageState encapsula a lógica de sincronização do estado com o `localStorage`.
const useStorageState = (key, initialState) => {
  // A: Usamos `key` para salvar o valor no `localStorage`.
  const [value, setValue] = useState(localStorage.getItem(key) || initialState); // A: Adicionamos `key` como dependência para garantir que o efeito seja executado corretamente se a chave mudar.

  useEffect(() => {
    localStorage.setItem(key, value); // A: `key` para salvar o valor no `localStorage`.
  }, [value, key]); // A: `key` como dependência para garantir que o efeito seja executado corretamente se a chave mudar.

  return [value, setValue]; // A: Retornamos o estado e a função de atualização como um array.
};

const App = () => {
  const stories = [
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

  // B: Substituímos o uso direto de `useState` e `useEffect` pelo nosso gancho personalizado `useStorageState`.
  const [searchTerm, setSearchTerm] = useStorageState(
    "search", // B: Passamos a chave `'search'` para identificar o valor no `localStorage`.
    "React" // B: Passamos o estado inicial `'React'` como segundo argumento.
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;
