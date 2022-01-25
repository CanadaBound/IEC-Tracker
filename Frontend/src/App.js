
import './App.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminDashboard from './Components/AdminDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {

  const [adminView, setAdminView] = useState(false);

  useEffect(()=>{
    axios.get('/auth')
    .then(res=>{
      console.log(res);
      if(res.status === 200){
        setAdminView(true);
        console.log(true);
      }else{
        setAdminView(false);
        console.log(false);

      }
    })
    .catch(err=>{
      console.log(err);
      setAdminView(false);
    })


  },[]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path ='/' element={
          
             <LandingPage/>
        
          }/>
         {/* {adminView?<Route path ='/Admin' element={<AdminDashboard/>}/>:<Route path='/Admin' element={<Navigate replace to="/" />}/>} */}
         <Route path ='/Admin' element={adminView?<AdminDashboard/>:<LandingPage/>}/>
          
        </Routes>
        
      </div>
    </BrowserRouter>
   
  );
}

export default App;
