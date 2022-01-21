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
	
	function handleChange(e){
		setSearchValue(e.target.value);
		setShowSearch(true);
		if(e.target.value.length === 0){
			setShowSearch(false);
		}
	}

	function handleSearchClick(e){
		inputRef.current.focus();
		setSearchValue('');
		setShowSearch(false);
		setSelectedCountry(oldArray => [...oldArray, e.currentTarget.textContent] );
	}

	useEffect(()=>{
		if(initLoad){
			getData().then(res=>{
				console.log(res.data);
				setOriginalCountryArr(res.data);
				setCountryArr(res.data);

			})
			setInitLoad(false);	
		}
		
	},[])
	
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
		
	},[searchValue])

	useEffect(()=>{console.log(selectedCountry)},[selectedCountry])
	
	
	
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