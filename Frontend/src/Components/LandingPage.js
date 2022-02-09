import { useEffect, useState } from 'react';

import Card from './Card';
import Navigation from './Navigation';
import Quotes from './Quotes';
import Search from './Search';

import '../CSS/LandingPage.css';

function LandingPage(){
	const [selectedCountry, setSelectedCountry] = useState([]);

	//This runs only on load of the page and it checks if the user has set any countries to favourite and stored them
	//in their local storage. if they have it gets added to the array which will then display the correct card and values for it.
	useEffect(()=>{
		if(localStorage.getItem('FavouriteOne') !== null){
			setSelectedCountry(prev=>[...prev, localStorage.getItem('FavouriteOne')]);
		}
		if(localStorage.getItem('FavouriteTwo') !== null){
			setSelectedCountry(prev=>[...prev, localStorage.getItem('FavouriteTwo')]);
		}
		return ()=>{
			setSelectedCountry([]);
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