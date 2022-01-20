import axios from "axios";

//Get all Country data from database
export async function getData(){
	try{
		return await axios.get('countries');
	}
	catch(err){
		console.log(err);
	}

}

//Get single Country data from database
export async function getSingleCountry(id){
	try{
		return await axios.get(`countries/${id}`);
	}
	catch(err){
		console.log(err);
	}

}

export async function getSingleCountryByName(name){
	try{
		return await axios.get(`countries/filteredCountries/${name}`);
	}
	catch(err){
		console.log(err);
	}
}

//Get all ROIs for one country from database
export async function getAllCountryROI(name){
	try{
		return await axios.get(`roi/filteredROI/${name}`);
	}
	catch(err){
		console.log(err);
	}

}

