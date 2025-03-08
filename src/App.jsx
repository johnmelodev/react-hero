import { useState, useEffect } from "react";

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
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

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* A: Substituímos o componente Search pelo InputWithLabel */}
      {/* O novo componente é mais genérico e aceita props dinâmicas */}
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

// B: Renomeamos o componente Search para InputWithLabel
// C: Adicionamos novas props (id, label, type) para torná-lo reutilizável
const InputWithLabel = ({
  id,
  label,
  value,
  type = "text", // D: Adicionamos um valor padrão para o tipo de entrada
  onInputChange,
}) => (
  <>
    {/* E: Generalizamos o rótulo para aceitar qualquer texto dinâmico */}
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input
      id={id} // F: Usamos o ID dinâmico para evitar duplicação
      type={type} // G: O tipo de entrada agora pode ser personalizado
      value={value}
      onChange={onInputChange}
    />
  </>
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
