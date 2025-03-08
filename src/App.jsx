import { useState } from "react";

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

  const [searchTerm, setSearchTerm] = useState("React");

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

// A: Aqui, a destruturação de objetos é usada para extrair `search` e `onSearch` diretamente da assinatura da função.
// Isso elimina a necessidade de acessar `props.search` e `props.onSearch` dentro do componente.
const Search = (
  { search, onSearch } // A
) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search} // A: Agora `search` é usado diretamente, sem `props.search`.
      onChange={onSearch} // A: Agora `onSearch` é usado diretamente, sem `props.onSearch`.
    />
  </div>
);

// B: Aqui, a destruturação de objetos é usada para extrair `list` diretamente da assinatura da função.
const List = (
  { list } // B
) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

// C: Aqui, a destruturação de objetos é usada para extrair `item` diretamente da assinatura da função.
const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>{" "}
    </span>
    <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
    <span>{item.points}</span>{" "}
  </li>
);

export default App;
