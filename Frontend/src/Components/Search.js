import '../CSS/Search.css';
import { useEffect, useRef, useState } from 'react';
import {getData} from '../HelperFunctions';

function Search({setSelectedCountry,selectedCountry}){
	const [searchValue, setSearchValue] = useState('');
	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);
	const [initLoad, setInitLoad] = useState(true);
	const [showSearch, setShowSearch] = useState(false);
	const inputRef = useRef();


	//Function is fired when you type something in the search box. We set the state value to whatever has been typed, 
	//we show the drop down box of countries as long as there is value in the box. Empty box = closed dropdown.
	function handleChange(e){
		setSearchValue(e.target.value);
		setShowSearch(true);
		if(e.target.value.length === 0){
			setShowSearch(false);
		}
	}

	//Function is fired when a user clicks on one of the country results in the drop down. We clear the search value, hide the drop down
	//and add the selected country to the state array. This allows for multiple countries to be selected.
	function handleSearchClick(e){
		inputRef.current.focus();
		setSearchValue('');
		setShowSearch(false);
		setSelectedCountry(oldArray => [...oldArray, e.currentTarget.textContent] );
	}


	//This useEffect will check if it's the initial load and if it is, it will run the API helper function getData and set the
	//countryArr (will eventually be edited and cut down when search is ran) and original country arr (full unedited list of countries) to the values
	//from the database.
	useEffect(()=>{
		if(initLoad){
			getData().then(res=>{
				setOriginalCountryArr(res.data);
				setCountryArr(res.data);

			})
			setInitLoad(false);	
		}
		
	},[initLoad])


	//This useEffect handles the heavy lifting of the search function. First we make sure it's not the initial load and check if there's a value in the search bar.
	//If there is no value, we simply set the country arr which holds the edited country array to the unedited country arr,
	//take the first 5 results and display it. If there is a value in the search bar, we filter the array based on if the value in the search bar
	//is contained within the list and then we sort it alphabetically and take the first 5 results. This result is displayed as a dropdown.
	useEffect(()=>{

		if(!initLoad){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
			var noSearchCopy = [...originalCountryArr];
			setCountryArr(noSearchCopy.sort().splice(0,5));
			}else{
				var copyArr = [...originalCountryArr];
				copyArr = copyArr.filter(country=>country.country_name.toLowerCase().includes(searchValue.toLowerCase())).sort().splice(0,5);
			
				setCountryArr(copyArr);

			}
		}

		return()=>{
			setCountryArr([]);
			
		}
		
	},[searchValue, initLoad, originalCountryArr])

	return(
		<div className="Search-Container">
			<input 
			type='search' 
			className="Search-Bar" 
			placeholder='Search your country here...'
			value = {searchValue}
			onChange={(e)=>handleChange(e)}
			onFocus={()=>searchValue.length === 0? setShowSearch(false): setShowSearch(true)}
			onBlur={()=>searchValue.length === 0? setShowSearch(false): null}
			ref={inputRef}
			/>
			
			{showSearch? <div className='Search-Dropdown' >
				
				<ul>{countryArr.map(country=>{return <li key ={country.country_name}><button className='Country-Link' onClick={(e)=>handleSearchClick(e)}>{country.country_name}</button></li>})}</ul>
				
			</div>: null}
		</div>
	);
}

export default Search;