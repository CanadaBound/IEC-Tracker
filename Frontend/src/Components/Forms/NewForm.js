import {useState} from 'react';
import axios from 'axios';

import '../../CSS/Forms/NewForm.css';

function NewForm(){

	//New Season functionality
	const [name, setName] = useState('');
	const [quota, setQuota] = useState('');
	const [season, setSeason] = useState('');

	async function onSubmit(e){
		e.preventDefault();

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

	return (
		<>
			<h1 className="New-Season-Title">New Season Quotas</h1>
			<form className="New-Season-Form">
				<div>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder="Country"
					/>
				</div>
				<div>
					<input
						type="text"
						value={quota}
						onChange={(e) => setQuota(e.currentTarget.value)}
						placeholder="Quota"
					/>
				</div>
				<div>
					<input
						type="text"
						value={season}
						onChange={(e) => setSeason(e.currentTarget.value)}
						placeholder="Season"
					/>
				</div>
				<div>
					<input
						type="submit"
						className="Submit-Button"
						onClick={(e) => onSubmit(e)}
					/>
				</div>
			</form>
		</>
  );

}
export default NewForm;