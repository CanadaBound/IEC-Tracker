import { useState } from 'react';

import Card from './Card';
import Navigation from './Navigation';
import Quotes from './Quotes';
import Search from './Search';

import '../CSS/LandingPage.css';

function LandingPage(){
	const [selectedCountry, setSelectedCountry] = useState('');

	return(
		<>
		<Navigation/>
              <Search setSelectedCountry ={setSelectedCountry}/>
              <div className='Card-Holder'>
                <Card selectedCountry ={selectedCountry}/>
              </div>
              <Quotes/>
		</>
			  
	);
}
export default LandingPage;