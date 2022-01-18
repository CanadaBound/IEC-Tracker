import '../CSS/CountryForm.css';
import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import {getData, getSingleCountry} from '../HelperFunctions';

function CountryForm({setShowCountryForm}){

	const [name, setName] = useState('');
	const [quota, setQuota] = useState('');
	const [season, setSeason] = useState('');
	const [showNewSeason, setShowNewSeason] = useState(true);
	const [showEditSeason, setShowEditSeason] = useState(false);
	const [showDeleteSeason, setShowDeleteSeason] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);
	const [initLoad, setInitLoad] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState([]);
	const [prevButton, setPrevButton] = useState();


	const containerRef = useRef();
	function toggleForms(button){
		switch (button){
			case 'New':
				setShowNewSeason(true);
				setShowEditSeason(false);
				setShowDeleteSeason(false);
				break;
			case 'Edit':
				setShowNewSeason(false);
				setShowEditSeason(true);
				setShowDeleteSeason(false);
				break;
			case 'Delete':
				setShowNewSeason(false);
				setShowEditSeason(false);
				setShowDeleteSeason(true);
				break;
			default:
				break;
		}
	}

	function toggleForm(e, id){
		
		if(e.currentTarget.className === 'Selector-Button'){
			setShowForm(true);
			e.currentTarget.className = 'Selector-Button-Active';
			getSingleCountry(id).then(res=>{
				setSelectedCountry(res.data);
			})
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					if(localArr[i].id === prevButton){
						localArr[i].className = 'Selector-Button';
					}
				}
				
			}
			
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'Selector-Button'
			setSelectedCountry([]);
			setShowForm(false);
		}
	}
	


	async function onSubmit(e){
		e.preventDefault();

		axios.post('countries', {
			country_name: name,
			country_quota: quota,
			country_season: season
		  })
		  .then(function (response) {
			console.log(response);
			setName('');
			setQuota('');
			setSeason('');
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	function onUpdate(e,id){
		e.preventDefault();

		axios.put(`countries/${id}`, {
			country_name: selectedCountry.country_name,
			country_quota: quota,
			country_season: season
		  })
		  .then(function (response) {
			console.log(response);
			setName('');
			setQuota('');
			setSeason('');
			showForm(false);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	function onDelete(e,id){
		e.preventDefault();
		axios.delete(`countries/${id}`);
	}

	useEffect(()=>{
		if(showEditSeason || showDeleteSeason){
			getData().then(res=>{
				setOriginalCountryArr(res.data);
				setCountryArr(res.data);

			})
			
		}
	},[showEditSeason, showDeleteSeason]);

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
		if(selectedCountry !==null || selectedCountry !== 'undefined'){
			setQuota(selectedCountry.country_quota);
			setSeason(selectedCountry.country_season);
		}

	},[selectedCountry])

	return(
	
	<section className="Country-Form">
		<button className='Season-Button-Active'>Season</button>
		<button className='ROI-Button' onClick={()=>setShowCountryForm(false)}>ROI</button>
		{showNewSeason? <button className='New-Season-Button-Active'>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/>
			</svg>
		</button>:<button className='New-Season-Button' onClick={()=>toggleForms('New')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/>
			</svg>
		</button>}
		{showEditSeason?<button className='Edit-Season-Button-Active'>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/>
			</svg>
		</button>:<button className='Edit-Season-Button' onClick={()=>toggleForms('Edit')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/>
			</svg>
		</button>}
		{showDeleteSeason?<button className='Delete-Season-Button-Active'>
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clip-rule="evenodd">
				<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
			</svg>
		</button>:<button className='Delete-Season-Button' onClick={()=>toggleForms('Delete')}>
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clip-rule="evenodd">
				<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
			</svg>
		</button>}
		{showNewSeason? <>
		<h1 className='New-Season-Title'>New Season Quotas</h1>
		<form className='New-Season-Form'>
			<div>
  				<input type="text" value={name} onChange={(e)=>setName(e.currentTarget.value)} placeholder='Country'/>
			</div>
			<div>
		
  				<input type="text" value={quota} onChange={(e)=>setQuota(e.currentTarget.value)} placeholder='Quota'/>
			  </div>
			<div>
		
  				<input type="text" value={season} onChange={(e)=>setSeason(e.currentTarget.value)} placeholder='Season'/>
			</div>
			<div>
				<input type="submit" className='Submit-Button' onClick={(e)=>onSubmit(e)}/>
				{/* <div className='Spinner' onAnimationEnd={}></div> */}
			</div>
			</form>
		</>:null}

		{showEditSeason?<>
			<h1 className='New-Season-Title'> Edit Season Quotas</h1>
			<div className='Edit-Season-Container'>

				<div className='Country-Selector' ref = {containerRef}>
					<input type="search" placeholder="Search.." value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className='Country-Selector-Search'/>
					{countryArr.map(country=> <button key ={country.country_name} className='Selector-Button' id={country._id} onClick={(e)=>toggleForm(e, country._id)}>{country.country_name}</button>)}

				</div>
				{showForm? <form className='Edit-Season-Form'>
					<label>Quota:</label>
					<input type='text' value={quota} onChange={(e)=>setQuota(e.currentTarget.value)} placeholder={selectedCountry.country_quota}/>
					<label>Season:</label>
					<input type='text' value={season} onChange={(e)=>setSeason(e.currentTarget.value)} placeholder={selectedCountry.country_season}/>
					<input type='submit' className='Submit-Button' onClick={(e)=>onUpdate(e,selectedCountry._id)}/>
				</form>:<form className='Edit-Season-Form'></form>}

			</div>
		</>:null}
		
		{showDeleteSeason?<>
			<h1 className='New-Season-Title'> Delete Season Quotas</h1>
			<div className='Delete-Season-Container'>

				<div className='Country-Selector-Delete' ref = {containerRef}>
					<input type="search" placeholder="Search.." value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className='Country-Selector-Search'/>
					{countryArr.map(country=> <div key ={country.country_name} className='Selector-Container' id={country._id}>
						{country.country_name}
						<button className='Delete-Button' onClick={(e)=>onDelete(e,country._id)}>
							<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clip-rule="evenodd">
								<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
							</svg>
						</button>
						</div>)}

				</div>
				
			</div>
		</>:null}
			
		
		
		
		
	</section>
	);

}
export default CountryForm;