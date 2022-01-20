import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

import { getAllCountryROI, getData } from '../../HelperFunctions';

import '../../CSS/Forms/NewROIForm.css';

function NewROIForm(){

	const [showForm, setShowForm]= useState(false);
	const [initLoad, setInitLoad] = useState(true);

	const [name, setName] = useState('');
	const [candidates, setCandidates] = useState('');
	const [permits, setPermits] = useState('');
	const [invitations, setInvitations] = useState('');
	const [date, setDate] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const [selectedCountry, setSelectedCountry] = useState([]);
	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);

	const [prevButton, setPrevButton] = useState();

	const containerRef = useRef();

	async function onSubmit(e){
		e.preventDefault();

		axios.post('roi', {
			country_name: name,
			country_candidates: candidates,
			country_permits: permits,
			country_invitations: invitations,
			country_date: date
		  })
		  .then(function (response) {
			console.log(response);
			setName('');
			setCandidates('');
			setPermits('');
			setInvitations('');
			setDate('');
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	function toggleROIList(e, name){
		
		if(e.currentTarget.className === 'New-ROI-Selector-Button'){
			setShowForm(true);
			setName(name);
			e.currentTarget.className = 'New-ROI-Selector-Button-Active';
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					if(localArr[i].id === prevButton){
						localArr[i].className = 'New-ROI-Selector-Button';
					}
				}
				
			}
			
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'New-ROI-Selector-Button'
			setShowForm(false);
			setName('');

		}
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
	},[]);

	useEffect(()=>{
		
		if(!initLoad){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
				console.log('no search text');
				var noSearchCopy = [...originalCountryArr];
				setCountryArr(noSearchCopy);
			}else{
				var copyArr = [...originalCountryArr];
				copyArr = copyArr.filter(country=>country.country_name.toLowerCase().includes(searchValue.toLowerCase()));
			
				setCountryArr(copyArr);

			}
		}
		
	},[searchValue])
	

	return (
		<>
			<h1 className="New-ROI-Title">New Round of Invitations</h1>
			<div className='Layout-Wrapper'>
				<div className='New-ROI-Country-Selector' ref={containerRef}>
					<input type="search" placeholder="Search.." value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className='New-ROI-Country-Selector-Search'/>
    				{countryArr.map(country=> <button key ={country.country_name} className='New-ROI-Selector-Button' id={country._id} onClick={(e)=>toggleROIList(e, country.country_name)}>{country.country_name}</button>)}

				</div>
				<form className='New-ROI-Form'>
					{showForm?<>
					<input type="text" placeholder='Candidates' value={candidates} onChange={(e)=>setCandidates(e.currentTarget.value)}/>
					<input type="text" placeholder='Permits Left' value={permits} onChange={(e)=>setPermits(e.currentTarget.value)}/>
					<input type="text" placeholder='Invitations' value={invitations} onChange={(e)=>setInvitations(e.currentTarget.value)}/>
					<input type="date" placeholder='Date' value={date} onChange={(e)=>setDate(e.currentTarget.value)}/>
					<input type="submit" className='ROI-Submit-Button' onClick={(e)=>onSubmit(e)}/>
					</>:null}
				</form>
			</div>
			
		</>
  );

}
export default NewROIForm;