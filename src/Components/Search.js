import '../CSS/Search.css';
import Countries from '../Assets/Data/Countries';
import { useEffect, useRef, useState } from 'react';

function Search({setSelectedCountry}){
	const [searchValue, setSearchValue] = useState('');
	const [countryArr, setCountryArr] = useState([]);
	const [showSearch, setShowSearch] = useState(false);
	const inputRef = useRef();
	
	function handleChange(e){
		setSearchValue(e.target.value);
		setShowSearch(true);
		if(e.target.value.length === 0){
			setShowSearch(false);
		}
	}

	function handleSearchClick(e){
		inputRef.current.focus();
		setSearchValue(e.currentTarget.textContent);
		setShowSearch(false);
		setSelectedCountry(e.currentTarget.textContent);
	}

	

	
	
	useEffect(()=>{
		if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
			var noSearchCopy = [...Countries];
			setCountryArr(noSearchCopy.sort().splice(0,5));
		}else{
			var copyArr = [...Countries];
			copyArr = copyArr.filter(country=>country.toLowerCase().includes(searchValue.toLowerCase())).sort().splice(0,5);
		
			setCountryArr(copyArr);

		}
	},[searchValue])
	
	
	
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
				
				<ul>{countryArr.map(country=>{return <li key ={country}><button className='Country-Link' onClick={(e)=>handleSearchClick(e)}>{country}</button></li>})}</ul>
				
			</div>: null}
		</div>
	);
}

export default Search;