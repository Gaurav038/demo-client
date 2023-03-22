import './App.css';
import AllUsers from './Component/AllUsers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Component/NavBar';
import UpdateUser from './Component/UpdateUser';


function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
          <Route exact path="/" element={<AllUsers />}/>
          <Route exact path="/add/:userId" element={<UpdateUser />}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
