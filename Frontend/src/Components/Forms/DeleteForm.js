import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

import {getData} from '../../HelperFunctions';

import '../../CSS/Forms/DeleteForm.css';
function DeleteForm(){

	const [searchValue, setSearchValue] = useState('');
	const [initLoad, setInitLoad] = useState(true);
	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);
	const containerRef = useRef();

	function onDelete(e,id){
		e.preventDefault();
		axios.delete(`countries/${id}`);
	}

	useEffect(()=>{
		
		if(!initLoad){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
				console.log('no search text');
				var noSearchCopy = [...originalCountryArr];
				setCountryArr(noSearchCopy.sort());
			}else{
				var copyArr = [...originalCountryArr];
				copyArr = copyArr.filter(country=>country.country_name.toLowerCase().includes(searchValue.toLowerCase())).sort();
			
				setCountryArr(copyArr);

			}
		}else{
			setInitLoad(false);
		}
		
	},[searchValue])

	useEffect(()=>{

		getData().then(res=>{
			setOriginalCountryArr(res.data);
			setCountryArr(res.data);

		});
		
	
	},[]);
	

	return(
		<>
		<h1 className='Delete-Season-Title'> Delete Season Quotas</h1><div className='Delete-Season-Container'>

		<div className='Country-Selector-Delete' ref={containerRef}>
			<input type="search" placeholder="Search.." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='Country-Selector-Search-Delete' />
			{countryArr.map(country => 
			
			<div key={country.country_name} className='Selector-Container' id={country._id}>
				{country.country_name}
				<button className='Delete-Button' onClick={(e) => onDelete(e, country._id)}>
					<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
						<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
					</svg>
				</button>
			</div>)}

		</div>

		</div>
		</>
	);

}
export default DeleteForm;