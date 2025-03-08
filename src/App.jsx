import { useState, useEffect, useRef } from "react";

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

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} />
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
  // A: Primeiro, criamos uma referência (`ref`) com o Hook `useRef` do React.
  // Essa referência é um valor persistente que permanece intacto durante o ciclo de vida do componente.
  const inputRef = useRef();

  // C: Terceiro, usamos o Hook `useEffect` para acessar o ciclo de vida do React.
  // Executamos o foco no elemento quando o componente é renderizado ou suas dependências mudam.
  useEffect(() => {
    if (isFocused && inputRef.current) {
      // D: Quarto, a propriedade `current` da referência dá acesso ao elemento DOM real.
      // Executamos seu foco programaticamente como um efeito colateral.
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B: Segundo, passamos a referência ao atributo `ref` do JSX do elemento. */}
      {/* Isso associa a instância do elemento DOM à propriedade mutável `current` da referência. */}
      <input
        ref={inputRef} // Alteração aqui: adicionamos a referência `ref` para controle imperativo.
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

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
