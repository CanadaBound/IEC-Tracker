import { useState } from 'react';
import './App.css';
import Card from './Components/Card';

import Navigation from './Components/Navigation';
import Quotes from './Components/Quotes';
import Search from './Components/Search';

function App() {

  const [selectedCountry, setSelectedCountry] = useState('');

  return (
   <div className='App'>
      <Navigation/>
      <Search setSelectedCountry ={setSelectedCountry}/>
      <div className='Card-Holder'>
        <Card selectedCountry ={selectedCountry}/>
      </div>
      <Quotes/>
   </div>
  );
}

export default App;
