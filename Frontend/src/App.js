
import './App.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminDashboard from './Components/AdminDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {

  const [adminView, setAdminView] = useState(false);

  //This useEffect runs when a person first opens the page and it sends a request to the backend to verify if there is a cookie stored from previous login,
	//and if there is a cookie, if it's still valid. If it is, you will automatically go into Admin mode otherwise you will have to log in again.
	useEffect(()=>{
		axios.get('/auth')
			.then(res=>{
				if(res.status === 200){
					setAdminView(true);
				}else{
					setAdminView(false);
				}
			})
			.catch(err=>{
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
