import logo from './logo.svg';
import './App.css';
import TODO from './to-dolist';

function App() {
  return (
    <div className="App">
          <h1>TO-DO LIST:</h1>
  <div className="outer">

<div className="inner">
 <TODO/>  {/* it is the todo component created for todo list  */}

</div>
 </div>
    </div>
  );
}

export default App;
