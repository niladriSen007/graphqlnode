
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";




const GET_TODOS = gql`
  query GetTodos{
    getTodos {
      title
     
    }
  }
`;



function App() {

  const { loading, error, data } = useQuery(GET_TODOS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(JSON.stringify(data));

  return (
    <>
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>App.jsx</code> and save to test Vite + React.
        </p>
       
        <p>
          <h2>Todo List</h2>
          <ul>
            {data.getTodos.map((todo, index) => (
              <li key={index} >
                <h3 style={{color:"white"}}>{todo.title}</h3>
                
              </li>
            ))}
          </ul>
        </p>
      </header>
    </>
  );
}

export default App;
