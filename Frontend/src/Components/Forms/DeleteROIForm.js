import {useState, useEffect, useRef} from 'react';
import { getAllCountryROI, getData } from '../../HelperFunctions';
import axios from 'axios'; 
import '../../CSS/Forms/DeleteROIForm.css';
function DeleteROIForm(){


	const [showROIList, setShowROIList] = useState(false);
	const [initLoad, setInitLoad] = useState(true);

	const [searchValue, setSearchValue] = useState('');
	const [selectedCountryROI, setSelectedCountryROI] = useState([]);

	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);

	const [prevButton, setPrevButton] = useState('');

	const containerRef = useRef();

	//When delete button has been pressed, we send a request to the API to delete the given record.
	function onDelete(e,id){
		e.preventDefault();
		axios.delete(`roi/${id}`);
	}

	//This delete form has the added functionality of needing to not only select a country but also the individual ROI
	//so when a country has been clicked we get all of the related ROI records and set them to a state array that will
	//then be displayed in the form. The rest of the functionality is handling the active/inactive state of the buttons.
	//When it's active the color is darker and clearly selected, when you switch to a different value that previous button
	//will be changed.
	function toggleROIList(e, name){
		
		if(e.currentTarget.className === 'Delete-ROI-Selector-Button'){
			setShowROIList(true);
			e.currentTarget.className = 'Delete-ROI-Selector-Button-Active';
			getAllCountryROI(name).then(res=>{
				setSelectedCountryROI(res.data);		
			})
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					if(i!== 0 && localArr[i].id === prevButton){
						localArr[i].className = 'Delete-ROI-Selector-Button';
					}
				}
				
			}
			
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'Delete-ROI-Selector-Button-Active';
			setSelectedCountryROI([]);
			setShowROIList(false);
		}
	}

	//After a country has been selected, you can click the back button to the go to th country list. We then hide the ROI list
	//clear it and any search value in the search box
	function handleBackButton(){
		setShowROIList(false);
		setSelectedCountryROI([]);
		setSearchValue('');
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

	//If ROI list is not open, we filter the list of countries by what has been typed inside the search box on the form
	//if the search value is zero we simply copy the original country array we recieved from the API. If the ROI list is open
	//we do the same but on the ROI data not the country data.
	useEffect(()=>{
		
		if(!initLoad && !showROIList){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
		
				var noSearchCopy = [...originalCountryArr];
				setCountryArr(noSearchCopy);
			}else{
				var copyArr = [...originalCountryArr];
				copyArr = copyArr.filter(country=>country.country_name.toLowerCase().includes(searchValue.toLowerCase()));
			
				setCountryArr(copyArr);

			}
		}else if(!initLoad && showROIList){
			if(searchValue.length === 0 || searchValue === null || typeof searchValue === 'undefined'){
				console.log('no search text');			
				var noSearchCopyROI = [...selectedCountryROI];
				setCountryArr(noSearchCopyROI);
			}else{
				var copyArrROI = [...selectedCountryROI];
				copyArrROI = copyArrROI.filter(country=>country.country_date.includes(searchValue));
			
				setCountryArr(copyArrROI);

			}
		}
		
	},[searchValue])


	return(
		<>
		<h1 className="Delete-ROI-Title">Delete Round of Invitations</h1>
      <div className="Delete-ROI-Wrapper">
        <div className="Delete-ROI-Country-Selector" ref={containerRef}>
          {showROIList && selectedCountryROI.length === 0 ? (
            <p className="No-Records-Message">No records found</p>
          ) : null}
          {showROIList ? (
            <button className="Back-Button" onClick={() => handleBackButton()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
              </svg>
            </button>
          ) : null}
          <input
            type="search"
            placeholder="Search.."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="Delete-ROI-Country-Selector-Search"
          />
          {showROIList
            ? selectedCountryROI.map(roi => 
			
				<div key={roi._id} className='Delete-Selector-Container' id={roi._id}>
					{roi.country_date}
					<button className='Delete-Roi-Button' onClick={(e) => onDelete(e, roi._id)}>
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
							<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
						</svg>
					</button>
				</div>)
	
            : countryArr.map((country) => (
                <button
                  key={country.country_name}
                  className="Delete-ROI-Selector-Button"
                  id={country._id}
                  onClick={(e) => toggleROIList(e, country.country_name)}
                >
                  {country.country_name}
                </button>
              ))}
          :
        </div>
      </div>
    </>

	);

}
export default DeleteROIForm;