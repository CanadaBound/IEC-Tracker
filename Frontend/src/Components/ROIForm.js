import '../CSS/ROIForm.css';
import { useState } from 'react';

import NewROIForm from './Forms/NewROIForm';
import EditROIForm from './Forms/EditROIForm';
import DeleteROIForm from './Forms/DeleteROIForm';

function ROIForm({setShowCountryForm}){

	const [showNewROI, setShowNewROI] = useState(true);
	const [showEditROI, setShowEditROI] = useState(false);
	const [showDeleteROI, setShowDeleteROI] = useState(false);

	//This function is used to toggle between the different admin forms for the round of invitations data.
	function toggleForms(button){
		switch (button){
			case 'New':
				setShowNewROI(true);
				setShowEditROI(false);
				setShowDeleteROI(false);
				break;
			case 'Edit':
				setShowNewROI(false);
				setShowEditROI(true);
				setShowDeleteROI(false);
				break;
			case 'Delete':
				setShowNewROI(false);
				setShowEditROI(false);
				setShowDeleteROI(true);
				break;
			default:
				break;
		}
	}
	

	return(
	
	<section className="ROI-Form">
		<button className='Season-Button' onClick={()=>setShowCountryForm(true)}>Season</button>
		<button className='ROI-Button-Active'>ROI</button>
		{showNewROI?<button className='New-ROI-Button-Active'>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/>
			</svg>
			
		</button>:<button className='New-ROI-Button' onClick={()=>toggleForms('New')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/>
			</svg>
			
		</button>}
		{showEditROI?<button className='Edit-ROI-Button-Active'>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/>
			</svg>
		</button>:<button className='Edit-ROI-Button' onClick={()=>toggleForms('Edit')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/>
			</svg>
		</button>}
		{showDeleteROI?<button className='Delete-ROI-Button-Active'>
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
				<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
			</svg>
		</button>:<button className='Delete-ROI-Button' onClick={()=>toggleForms('Delete')}>
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
				<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
			</svg>
		</button>}
	

		
			{showNewROI?<NewROIForm/>:null}

			{showEditROI?<EditROIForm/>:null}

			{showDeleteROI?<DeleteROIForm/>:null}
	
		
		
	</section>
	);

}
export default ROIForm;