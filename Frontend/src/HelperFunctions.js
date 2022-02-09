import { useEffect, useRef } from "react";
import axios from "axios";
//API Related functions


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


//Other shared functions

//useInterval hook for changing the quotes on the bottom of the landing page every few seconds
export function useInterval(callback, delay) {
	const savedCallback = useRef();
  
	// Remember the latest callback.
	useEffect(() => {
	  savedCallback.current = callback;
	}, [callback]);
  
	// Set up the interval.
	useEffect(() => {
	  function tick() {
		savedCallback.current();
	  }
	  if (delay !== null) {
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	  }
	}, [delay]);
}

//Validate that input is number only in number only inputs

export function isNumber(value){
	return value.replace(/\D/g, '');
}

//Validate that input is letters only in letter only inputs

export function isLetter(value){
	return value.replace(/[^a-zA-Z]/g,"");
}
