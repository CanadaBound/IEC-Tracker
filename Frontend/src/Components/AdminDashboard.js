import { useState } from 'react';
import '../CSS/AdminDashboard.css';
import AdminNavigation from './AdminNavigation';
import CountryForm from './CountryForm';
import ROIForm from './ROIForm';

function AdminDashboard(){

	const [showCountryForm, setShowCountryForm] = useState('true');

	return(
		<main className='Admin-Dashboard-Container'>
			<AdminNavigation/>
			<article className='Form-Container'>
				{showCountryForm? 
				<CountryForm setShowCountryForm={setShowCountryForm}/>:
				<ROIForm setShowCountryForm={setShowCountryForm}/>}
			</article>

		</main>
	);
}

export default AdminDashboard;