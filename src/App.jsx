const list = [
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

// A: Refatoração do componente App para arrow function.
const App = () => (
  <div>
    <h1>My Hacker Stories</h1>

    <Search />

    <hr />

    <List />
  </div>
);

// B: Refatoração do componente Search para arrow function
// Omitimos as chaves `{}` e o `return`, pois o JSX é retornado diretamente.
const Search = () => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
  </div>
);

// C: Refatoração do componente List para arrow function.
const List = () => (
  <ul>
    {list.map((item) => (
      <li key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    ))}
  </ul>
);

export default App;
