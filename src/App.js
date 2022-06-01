import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from "./components/Navbar"
import AllCountry from './components/AllCountry';
import Feature from './components/Feature';
function App() {
  return (
    <Router>
    <div>
     <Navbar/>
     <Routes>
       <Route exact path='/' element={<AllCountry/>}/>
       <Route exact path='/lists/:capital' element={<Feature/>}/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
