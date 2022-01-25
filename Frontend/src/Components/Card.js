import { useEffect, useRef, useState } from 'react';
import '../CSS/Card.css';

import {getSingleCountryByName, getAllCountryROI} from '../HelperFunctions';

function Card({selectedCountry, selectedCountryArr, setSelectedCountryArr}){

	const [showCountryCard, setShowCountryCard] = useState(false);
	
	const [selectedCountryData, setSelectedCountryData]= useState({});
	const [selectedCountryROIData, setSelectedCountryROIData]= useState([]);

	const [slicedROIArr, setslicedROIArr] = useState([]);

	const [favourite, setFavourite] = useState(false);


	const [onePersonPct, setOnePersonPct] = useState('');
	const [twoPeoplePct, setTwoPeoplePct] = useState('');

	const [chanceClassContainer, setChanceClassContainer] = useState('Chance-Container');
	const [chanceClassP, setChanceClassP] = useState('Chances-Title');

	const [cardContainer, setCardContainer] = useState('Card-Container');
	const [cardName, setCardName] = useState('Country-Name');
	const [cardQuota, setCardQuota] = useState('Country-Quota');
	const [cardCandidates, setCardCandidates] = useState('Country-Candidates');
	const [cardPermits, setCardPermits] = useState('Country-Permits');
	const [cardHistory, setCardHistory] = useState('Historical-Draws');

	const chanceRef = useRef();
	
	function deleteCard(country){
		let filteredArr = selectedCountryArr.filter(countryItem=> country!== countryItem);
		setSelectedCountryArr(filteredArr);
	}

	function favouriteCard(country){
		if(!favourite && localStorage.getItem('FavouriteOne')=== null){
			localStorage.setItem('FavouriteOne', country);
			setFavourite(true);
		}else if(favourite && localStorage.getItem('FavouriteOne')=== selectedCountry){
			localStorage.removeItem('FavouriteOne');
			setFavourite(false);
		}else if(!favourite && localStorage.getItem('FavouriteTwo')=== null){
			localStorage.setItem('FavouriteTwo', country);
			setFavourite(true);
		}else if(favourite && localStorage.getItem('FavouriteTwo')=== selectedCountry){
			localStorage.removeItem('FavouriteTwo');
			setFavourite(false);
		}
	
		
	}

	useEffect(()=>{
		
		

			if(selectedCountry.length === 0){
				setShowCountryCard(false);
				}else{
					getSingleCountryByName(selectedCountry).then(res=> setSelectedCountryData(res.data[0]));
					getAllCountryROI(selectedCountry).then(res=>{
					
						setSelectedCountryROIData(res.data.sort((a,b)=>new Date(b.country_date)-new Date(a.country_date)));
					});
				}
				if(selectedCountryArr.length >0){
					if(selectedCountry === selectedCountryArr[1]){
					setCardContainer('Card-Container-Two');
					setCardName('Country-Name-Two');
					setCardQuota('Country-Quota-Two');
					setCardCandidates('Country-Candidates-Two');
					setCardPermits('Country-Permits-Two');
					setCardHistory('Historical-Draws-Two');
					}
				}
				
			
		
	},[selectedCountry])

	

	useEffect(()=>{
		
		if(selectedCountryROIData !== null && typeof selectedCountryROIData !== 'undefined' && selectedCountryROIData.length > 0 &&selectedCountryData.country_name !== 'Australia'){
			setShowCountryCard(true);
			var copyArr = [...selectedCountryROIData];
				copyArr = copyArr.slice(0,2);
				setslicedROIArr(copyArr);
			
		

			if(selectedCountryROIData[0].country_permits/selectedCountryROIData[0].country_candidates>1){
				setOnePersonPct('100%');
				setTwoPeoplePct('100%');
			}else{
				var person1 = selectedCountryROIData[0].country_permits/selectedCountryROIData[0].country_candidates;
				var person2 = selectedCountryROIData[0].country_permits/selectedCountryROIData[0].country_candidates;
				setOnePersonPct(Math.round((person1)*100)+'%');
				setTwoPeoplePct(Math.round((person1*person2)*100)+'%');
			}


		}else{
			setOnePersonPct('100%');
			setTwoPeoplePct('100%');
		}
	},[selectedCountryROIData]);

	useEffect(()=>{
	
		if(parseInt(onePersonPct)>=50){
			setChanceClassContainer('Chance-Container');
			setChanceClassP('Chances-Title');
		}else if(parseInt(onePersonPct)>=30){
			setChanceClassContainer('Chance-Container-Neutral');
			setChanceClassP('Chances-Title-Neutral');
		}else{
			setChanceClassContainer('Chance-Container-Negative');
			setChanceClassP('Chances-Title-Negative');
		}

	},[onePersonPct])

	useEffect(()=>{
		if(localStorage.getItem('FavouriteOne') !== null && selectedCountry === selectedCountryArr[0]){
			setFavourite(true);
		}else if(localStorage.getItem('FavouriteOne') === null && selectedCountry === selectedCountryArr[0]){
			setFavourite(false);
		}else if(localStorage.getItem('FavouriteTwo') !== null && selectedCountry === selectedCountryArr[1]){
			setFavourite(true);
		}else if(localStorage.getItem('FavouriteTwo') === null && selectedCountry === selectedCountryArr[1]){
			setFavourite(false);
		}

	},[favourite]);

	return(
		<>
		{showCountryCard ? 
		<div className='Full-Card-Wrapper'>
			<button className={favourite?'Favourite-Button-Active':'Favourite-Button'} onClick={()=>favouriteCard(selectedCountry)}>
				
				<svg width="60" height="60" viewBox="0 0 60 60" fill="#AAAAAA" xmlns="http://www.w3.org/2000/svg">
					<path d="M26.2787 0.0679245C24.9003 0.311703 23.6719 1.10867 22.9124 2.25256C22.453 2.9417 22.5373 2.69792 20.7792 8.36109C20.4182 9.51904 19.8978 11.188 19.6258 12.0647C19.3539 12.9413 18.8382 14.5962 18.4818 15.7448L17.8348 17.8263L17.2722 17.9997C16.6299 18.2013 13.8919 19.0499 12.3072 19.5421C11.7164 19.7296 10.9006 19.9828 10.5021 20.1047C2.93966 22.4534 3.13189 22.3878 2.63022 22.6737C0.787668 23.7098 -0.234412 25.7585 0.0515826 27.8212C0.21099 28.9885 0.745472 30.0152 1.62221 30.8403C1.88007 31.0841 3.91017 32.5421 8.17196 35.5518L14.3513 39.9117L14.3232 41.1072C14.2763 43.2683 14.1966 50.6942 14.1872 53.2023C14.1825 55.7901 14.1825 55.7808 14.4029 56.484C14.5482 56.9528 14.9233 57.6372 15.2515 58.0545C16.719 59.9109 19.2836 60.5157 21.4027 59.5124C21.9513 59.2546 21.8763 59.3062 24.4033 57.4216C25.5661 56.5543 28.2572 54.5478 30.3905 52.9539L34.2631 50.0613L35.1024 50.3473C35.5618 50.5067 36.6214 50.863 37.4606 51.149C39.8799 51.9694 41.2442 52.4288 44.001 53.3664C48.4082 54.8619 48.7457 54.9744 49.1911 55.0494C51.6057 55.4667 54.0015 54.0602 54.8266 51.7443C55.1267 50.9052 55.2064 50.0191 55.0611 49.1659C55.0095 48.8659 54.7141 47.9283 54.1421 46.2406C53.2279 43.5496 52.6324 41.7869 51.9057 39.6445C51.6526 38.8897 51.1321 37.3661 50.7571 36.2644L50.0772 34.2532L52.9653 30.3809C54.5594 28.2478 56.6176 25.4912 57.5412 24.2536C58.9431 22.3784 59.2619 21.9189 59.4776 21.4876C60.3355 19.7437 60.1339 17.6903 58.9525 16.1386C58.2257 15.1822 57.213 14.5493 55.9331 14.2352C55.7315 14.1883 55.1126 14.1743 53.1435 14.179C50.6586 14.1883 43.6166 14.268 41.1645 14.3149L39.9221 14.3384L35.5618 8.16888C33.166 4.77473 31.1031 1.88689 30.9812 1.74625C29.8091 0.405464 27.9994 -0.236797 26.2787 0.0679245Z" fill="#FFC905" stroke='#FFA505' stroke-width='2'fill-opacity="1"/>
				</svg>

			</button>
			{favourite? null:<button className='Bin-Button' onClick={()=>deleteCard(selectedCountry)}>
				<svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.5 15V60H47.5V15H2.5ZM15 50C15 51.38 13.88 52.5 12.5 52.5C11.12 52.5 10 51.38 10 50V25C10 23.62 11.12 22.5 12.5 22.5C13.88 22.5 15 23.62 15 25V50ZM27.5 50C27.5 51.38 26.38 52.5 25 52.5C23.62 52.5 22.5 51.38 22.5 50V25C22.5 23.62 23.62 22.5 25 22.5C26.38 22.5 27.5 23.62 27.5 25V50ZM40 50C40 51.38 38.88 52.5 37.5 52.5C36.12 52.5 35 51.38 35 50V25C35 23.62 36.12 22.5 37.5 22.5C38.88 22.5 40 23.62 40 25V50ZM50 5V10H0V5H14.2775C16.5275 5 18.355 2.2525 18.355 0H31.6425C31.6425 2.2525 33.4675 5 35.72 5H50Z" fill="#FF0000" fill-opacity="1"/>
				</svg>
				
			</button>}
			
			<article className={cardContainer}>
				<section className={cardName}>
					<p>{selectedCountryData.country_name}</p>
				</section>
				<section className={cardQuota}>
					<p>Quota:</p>
					<p>{selectedCountryData.country_quota}</p> 
				</section>
				<section className={cardCandidates}>
					<p>Candidates:</p>
					<p>{selectedCountryROIData[0].country_candidates}</p>
				</section>
				<section className={cardPermits}>
					<p>Permits Left:</p>
					<p>{selectedCountryData.country_name === 'Australia'?'Unlimited':selectedCountryData.country_quota-selectedCountryROIData[0].country_invitations}</p>
				</section>
				<section className={cardHistory}>
					<p className='Historical-Title'>Historical Draws (Previous 3 weeks)</p>
					<div className='Historical-Data-Container'>
						<div className='Dates'>
							{selectedCountryROIData.length <= 3? selectedCountryROIData.map(roi=><p key={roi._id}>{roi.country_date}</p>):slicedROIArr.map(roi=><p key={roi._id}>{roi.country_date}</p>)}
						</div>
						<div className='Permits'>
							{selectedCountryROIData.length>0?<p>{selectedCountryROIData[0].country_invitations}</p>:null}
							{selectedCountryROIData.length>2 ?<p>{selectedCountryROIData[1].country_invitations-selectedCountryROIData[0].country_invitations}</p>:<p>0</p>}
							{selectedCountryROIData.length>=3?<p>{selectedCountryROIData[2].country_invitations-selectedCountryROIData[1].country_invitations}</p>:null}
						</div>
					</div>
				</section>
				
			</article>
			<aside ref={chanceRef} className={chanceClassContainer}>
				<p className={chanceClassP}>Chance</p>
				<div className='Chances-Layout'>
					<div className='One-Person'>
						<p>1 Person:</p>
						<p>{onePersonPct}</p>
					</div>
					<div className='Two-People'>
						<p>2 People:</p>
						<p>{twoPeoplePct}</p>
					</div>
				</div>
			</aside>
		</div>
		
		: null
		
		}
		
		{selectedCountry.length <2 ? <button className="Card-Border">
			<p className="Card-Text">
			You have not selected a country.
			</p>

			<p className="Card-Text">
			Please use the search bar above to make a selection.
			</p>

			<p className='Card-Text'>
			Or click on this card!
			</p>

			<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill='#AAA' d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
		</button>:null}
		
		</>
	);
}
export default Card;