import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { isNumber } from '../../HelperFunctions';
import '../../CSS/Forms/EditForm.css';

import {getSingleCountry, getData} from '../../HelperFunctions';

function EditForm(){


	const [quota, setQuota] = useState('');
	const [season, setSeason] = useState('');

	const [searchValue, setSearchValue] = useState('');
	const [prevButton, setPrevButton] = useState('');
	const [initLoad, setInitLoad] = useState(true);

	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState([]);

	const [showForm, setShowForm] = useState(false);
	

	const containerRef = useRef();
	//This is used to send values to the backend to update the correct season record. We send all the data to avoid potential empty or incorrect data.
	function onUpdate(e,id){
		e.preventDefault();

		axios.put(`countries/${id}`, {
			country_name: selectedCountry.country_name,
			country_quota: quota,
			country_season: season
		})
		.then(function (response) {
			setQuota('');
			setSeason('');
			showForm(false);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	//This function gathers the single data required to edit that specific season. The remainder of it just handles 
	//the look and function of the buttons when clicked.
	function toggleForm(e, id){
		
		if(e.currentTarget.className === 'Edit-Season-Selector-Button'){
			setShowForm(true);
			e.currentTarget.className = 'Edit-Season-Selector-Button-Active';
			getSingleCountry(id).then(res=>{
				setSelectedCountry(res.data);
			})
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					
					if(i!== 0 && localArr[i].id === prevButton){
						localArr[i].className = 'Edit-Season-Selector-Button';
					}
				}	
			}
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'Edit-Season-Selector-Button'
			setSelectedCountry([]);
			setShowForm(false);
		}
	}

	//We filter the list of countries by what has been typed inside the search box on the form
	//if the search value is zero we simply copy the original country array we recieved from the API.
	useEffect(()=>{
		
		if(!initLoad){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
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

	//This populates the editable fields with current values when a country has been selected.
	useEffect(()=>{
		if(selectedCountry !==null || selectedCountry !== 'undefined'){
			setQuota(selectedCountry.country_quota);
			setSeason(selectedCountry.country_season);
		}

	},[selectedCountry])

	//This runs the API helper function that retrieves all the country data.
	useEffect(()=>{
		getData().then(res=>{
			setOriginalCountryArr(res.data);
			setCountryArr(res.data);
		});	
	},[]);
	

	return (
		<>
			<h1 className="Edit-Season-Title"> Edit Season Quotas</h1>
			<div className="Edit-Season-Container">
				<div className="Edit-Season-Country-Selector" ref={containerRef}>
					<input
						type="search"
						placeholder="Search.."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						className="Edit-Season-Country-Selector-Search"
					/>
					{countryArr.map((country) => (
						<button
							key={country.country_name}
							className="Edit-Season-Selector-Button"
							id={country._id}
							onClick={(e) => toggleForm(e, country._id)}
						>
							{country.country_name}
						</button>
					))}
				</div>
				{showForm ? (
					<form className="Edit-Season-Form">
						<label>Quota:</label>
						<input
							type="text"
							value={quota}
							onChange={(e) => setQuota(isNumber(e.currentTarget.value))}
							placeholder={selectedCountry.country_quota}
						/>
						<label>Season:</label>
						<input
							type="text"
							value={season}
							onChange={(e) => setSeason(isNumber(e.currentTarget.value))}
							maxLength={4}
							placeholder={selectedCountry.country_season}
						/>
						<button
							className="Edit-Season-Submit-Button"
							onClick={(e) => onUpdate(e, selectedCountry._id)}
						>
							Save
						</button>
					</form>
				) : (
					<form className="Edit-Season-Form"></form>
				)}
			</div>
		</>
  );

}
export default EditForm;