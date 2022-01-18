
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminDashboard from './Components/AdminDashboard';



function App() {



  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path ='/' element={
          
             <LandingPage/>
        
          }/>
          <Route path ='/Admin' element={<AdminDashboard/>}/>
          
        </Routes>
        
      </div>
    </BrowserRouter>
   
  );
}

export default App;
