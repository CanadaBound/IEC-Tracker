import { useEffect, useState } from 'react';

import Card from './Card';
import Navigation from './Navigation';
import Quotes from './Quotes';
import Search from './Search';

import '../CSS/LandingPage.css';

function LandingPage(){
	const [selectedCountry, setSelectedCountry] = useState([]);

	useEffect(()=>{
		if(localStorage.getItem('FavouriteOne') !== null){
			console.log('local storage detected');
			setSelectedCountry(prev=>[...prev, localStorage.getItem('FavouriteOne')]);
		}
		if(localStorage.getItem('FavouriteTwo') !== null){
			console.log('local storage detected');
			setSelectedCountry(prev=>[...prev, localStorage.getItem('FavouriteTwo')]);
		}
	},[])
	return(
		<>
		<Navigation/>
              <Search setSelectedCountry ={setSelectedCountry} selectedCountry={selectedCountry}/>
              <div className='Card-Holder'>
                {selectedCountry.length === 0? <Card selectedCountry ={selectedCountry} selectedCountryArr ={selectedCountry}/> : selectedCountry.map(country=><Card key ={country} selectedCountry ={country} selectedCountryArr ={selectedCountry} setSelectedCountryArr ={setSelectedCountry}/>)}
		
              </div>
              <Quotes/>
		</>
			  
	);
}
export default LandingPage;