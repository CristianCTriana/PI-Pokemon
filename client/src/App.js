import './App.css';
import { Route, Routes} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import PokemonForm from './components/PokemonForm';
import Detail from './components/Detail';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/pokemonform' element={<PokemonForm/>}></Route>
          <Route path='/pokemons/:id' element={<Detail/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
