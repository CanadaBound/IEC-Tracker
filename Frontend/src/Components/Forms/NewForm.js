import {useState} from 'react';
import axios from 'axios';

import { isNumber, isLetter } from '../../HelperFunctions';

import '../../CSS/Forms/NewForm.css';

function NewForm(){

	const [inputClass, setInputClass] = useState([ {Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);

	const [nameError, setNameError] = useState(false);
	const [quotaError, setQuotaError] = useState(false);
	const [seasonError, setSeasonError] = useState(false);


	//New Season functionality
	const [name, setName] = useState('');
	const [quota, setQuota] = useState('');
	const [season, setSeason] = useState('');

	//This handles the submisison of the new data, it sends the data to the backend and clears the existing fields.
	async function onSubmit(e){
		e.preventDefault();
		if(name !== '' && quota !== '' && season !== ''){
			axios.post('countries', {
				country_name: name,
				country_quota: quota,
				country_season: season
		 	 })
		  	.then(function (response) {
				setName('');
				setQuota('');
				setSeason('');
			  })
		  	.catch(function (error) {
				console.log(error);
		  	});
		}
		else{
			if(name === '') setNameError(true);
			if(quota === '') setQuotaError(true);
			if(season === '') setSeasonError(true);

		}
		
	}

	function handleActiveinput(e){
	
		if(e._reactName === 'onFocus'){
			switch(e.target.id){
				case 'Country':
					setInputClass([{Input:'Input-Active', Label: 'Input-Label-Active'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					setNameError(false);
					break;
				case 'Quota':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Active', Label: 'Input-Label-Active'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					setQuotaError(false);
					break;
				case 'Season':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Active', Label: 'Input-Label-Active'}]);
					setSeasonError(false);
					break;
				default:
					setInputClass({Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'});

			}
			
			

		}else if(e._reactName === 'onBlur'){
			
			switch(e.target.id){
				case 'Country':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					break;
				case 'Quota':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					break;
				case 'Season':
					setInputClass([{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'}]);
					break;
				default:
					setInputClass({Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'},{Input:'Input-Inactive', Label: 'Input-Label'});

			}	
		}
	}

	return (
		<>
			<h1 className="New-Season-Title">New Season Quotas</h1>
			<form className="New-Season-Form">
				<div>
					{name === ''?<label className={inputClass[0].Label}>Country</label>:null}
					<input
						id='Country'
						className={inputClass[0].Input}
						type="text"
						value={name}
						onChange={(e) => setName(isLetter(e.currentTarget.value))}
						onFocus={(e)=>handleActiveinput(e)}
						onBlur={(e)=>handleActiveinput(e)}
						placeholder=""
						required
					/>
					{nameError? <p className='Error'>Country is required!</p>:null}
				</div>
				<div>
					{quota === ''?<label className={inputClass[1].Label}>Quota</label>:null}
					<input
						id='Quota'
						className={inputClass[1].Input}
						type="text"
						value={quota}
						onChange={(e) => setQuota(isNumber(e.currentTarget.value))}
						onFocus={(e)=>handleActiveinput(e)}
						onBlur={(e)=>handleActiveinput(e)}
						placeholder=""
						required
					/>
					{quotaError? <p className='Error'>Quota is required!</p>:null}
				</div>
				<div>
					{season === ''?<label className={inputClass[2].Label}>Season</label>: null}
					<input
						id='Season'
						className={inputClass[2].Input}
						type="text"
						value={season}
						onChange={(e) => setSeason(isNumber(e.currentTarget.value))}
						onFocus={(e)=>handleActiveinput(e)}
						onBlur={(e)=>handleActiveinput(e)}
						maxLength={4}
						placeholder=""
						required
					/>
					{seasonError? <p className='Error'>Season is required!</p>:null}
				</div>
				<div>
					<button
						className="Submit-Button"
						onClick={(e) => onSubmit(e)}
					>Submit</button>
				</div>
			</form>
		</>
  );

}
export default NewForm;