const App = () => {
  // A: Movemos a lista do escopo global para dentro do componente App.
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

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />
      <hr />
      {/* B: Passamos a lista como uma prop para o componente List. "list" é usado para enviar a variável "stories" ao componente List. */}
      <List list={stories} />
    </div>
  );
};

const Search = () => {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
    </div>
  );
};

// C: O componente List agora recebe props como parâmetro. Permite acessar a lista passada pelo componente pai (App)
const List = (props) => (
  <ul>
    {/* C: Usamos props.list para acessar a lista passada como propriedade. Em seguida, usamos map() para iterar sobre os itens da lista. */}
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

// D: Criamos um novo componente chamado Item. Este componente é responsável por renderizar cada item da lista.
const Item = (props) => (
  <li>
    <span>
      {/* D: Acessamos as propriedades do item através de props.item. */}
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App;
