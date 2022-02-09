import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

import { getAllCountryROI, getData, isNumber } from '../../HelperFunctions';

import '../../CSS/Forms/NewROIForm.css';

function NewROIForm(){

	const [inputClass, setInputClass] = useState([ {Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);


	const [showForm, setShowForm]= useState(false);
	const [initLoad, setInitLoad] = useState(true);

	const [name, setName] = useState('');
	const [candidates, setCandidates] = useState('');
	const [permits, setPermits] = useState('');
	const [invitations, setInvitations] = useState('');
	const [date, setDate] = useState('');

	const [candidatesError, setCandidatesError] = useState(false);
	const [permitsError, setPermitsError] = useState(false);
	const [invitationsError, setInvitationsError] = useState(false);
	const [dateError, setDateError] = useState(false);


	const [searchValue, setSearchValue] = useState('');

	const [selectedCountry, setSelectedCountry] = useState([]);
	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);

	const [prevButton, setPrevButton] = useState('');

	const containerRef = useRef();
	
	//This handles the submisison of the new data, it sends the data to the backend and clears the existing fields.
	async function onSubmit(e){
		e.preventDefault();
		if(candidates !== '' && permits !== '' && invitations !== '' && date !== ''){
		axios.post('roi', {
			country_name: name,
			country_candidates: candidates,
			country_permits: permits,
			country_invitations: invitations,
			country_date: date
		  })
		  .then(function (response) {
			setName('');
			setCandidates('');
			setPermits('');
			setInvitations('');
			setDate('');
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		}else{
			if(candidates === '') setCandidatesError(true);
			if(permits === '') setPermitsError(true);
			if(invitations === '') setInvitationsError(true);
			if(date === '') setDateError(true);

		}
	}
	//This function opens the form when a country is clicked. The remainder of it just handles 
	//the look and function of the buttons when clicked.
	function toggleROIList(e, name){
		
		if(e.currentTarget.className === 'New-ROI-Selector-Button'){
			setShowForm(true);
			setName(name);
			e.currentTarget.className = 'New-ROI-Selector-Button-Active';
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					if(i!== 0 && localArr[i].id === prevButton){
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

	//This runs the API helper function that retrieves all the country data.
	useEffect(()=>{
		if(initLoad){
			getData().then(res=>{
				setOriginalCountryArr(res.data);
				setCountryArr(res.data);
			})	
			setInitLoad(false);		
		}
	},[]);

	//This function allows for the sliding effect of the placeholder on the form when an input is clicked. The placeholder value moves up so
	//that it's still visible when typing. This just handles the switching between classes.
	function handleActiveinput(e){
	
		if(e._reactName === 'onFocus'){
			switch(e.target.id){
				case 'Candidates':
					setInputClass([{Input:'Input-Active', Label: 'Input-Label-Active'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					setCandidatesError(false);
					break;
				case 'Permits':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Active', Label: 'Input-Label-Active'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					setPermitsError(false);
					break;
				case 'Invitations':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Active', Label: 'Input-Label-Active'}]);
					setInvitationsError(false);
					break;
				default:
					setInputClass({Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'});

			}	
			

		}else if(e._reactName === 'onBlur'){
			
			switch(e.target.id){
				case 'Candidates':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					break;
				case 'Permits':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					break;
				case 'Invitations':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					break;
				default:
					setInputClass({Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'});

			}	
		}
	}
	
	//We filter the list of countries by what has been typed inside the search box on the form
	//if the search value is zero we simply copy the original country array we recieved from the API.
	useEffect(()=>{
		
		if(!initLoad){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
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
			<div className="Layout-Wrapper">
				<div className="New-ROI-Country-Selector" ref={containerRef}>
					<input
						type="search"
						placeholder="Search.."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						className="New-ROI-Country-Selector-Search"
					/>
					{countryArr.map((country) => (
						<button
							key={country.country_name}
							className="New-ROI-Selector-Button"
							id={country._id}
							onClick={(e) => toggleROIList(e, country.country_name)}
						>
							{country.country_name}
						</button>
					))}
				</div>
				<form className="New-ROI-Form">
					{showForm ? (
						<>
							<div>
								{candidates === ''?<label className={inputClass[0].Label}>Candidates</label>:null}
								<input
									type="text"
									id='Candidates'
									placeholder=""
									value={candidates}
									onChange={(e) => setCandidates(isNumber(e.currentTarget.value))}
									onFocus={(e)=>handleActiveinput(e)}
									onBlur={(e)=>handleActiveinput(e)}
									className={inputClass[0].Input}
									required
								/>
								{candidatesError? <p className='Error'>Candidates is required!</p>:null}

							</div>
							<div>
								{permits === ''?<label className={inputClass[1].Label}>Permits</label>:null}
								<input
									type="text"
									id='Permits'
									placeholder=""
									value={permits}
									onChange={(e) => setPermits(isNumber(e.currentTarget.value))}
									onFocus={(e)=>handleActiveinput(e)}
									onBlur={(e)=>handleActiveinput(e)}
									className={inputClass[1].Input}
									required

								/>
								{permitsError? <p className='Error'>Permits is required!</p>:null}
							</div>
							<div>
								{invitations===''?<label className={inputClass[2].Label}>Invitations</label>:null}
								<input
									type="text"
									id='Invitations'
									placeholder=""
									value={invitations}
									onChange={(e) => setInvitations(isNumber(e.currentTarget.value))}
									onFocus={(e)=>handleActiveinput(e)}
									onBlur={(e)=>handleActiveinput(e)}
									className={inputClass[2].Input}
									required

								/>
								{invitationsError? <p className='Error'>Invitations is required!</p>:null}
							</div>
							<div>
								<input
									type="date"
									placeholder=""
									className='Input-Inactive'
									value={date}
									onChange={(e) => setDate(e.currentTarget.value)}
									required

								/>
								{dateError? <p className='Error'>Date is required!</p>:null}
							</div>
							
							<button
								type="submit"
								className="ROI-Submit-Button"
								onClick={(e) => onSubmit(e)}
							>Submit</button>
						</>
					) : null}
				</form>
			</div>
		</>
  );

}
export default NewROIForm;