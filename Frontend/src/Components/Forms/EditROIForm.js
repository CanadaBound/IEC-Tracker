import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { getAllCountryROI, getData } from '../../HelperFunctions';
import '../../CSS/Forms/EditROIForm.css';
function EditROIForm(){

	const [showForm, setShowForm]= useState(false);
	const [showROIList, setShowROIList] = useState(false);
	const [initLoad, setInitLoad] = useState(true);
	const [toggleEditForm, setToggleEditForm] = useState(false);

	const [id, setID] = useState('');
	const [name, setName] = useState('');
	const [candidates, setCandidates] = useState('');
	const [permits, setPermits] = useState('');
	const [invitations, setInvitations] = useState('');
	const [date, setDate] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [selectedCountryROI, setSelectedCountryROI] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState([]);
	const [originalCountryArr, setOriginalCountryArr]= useState([]);
	const [countryArr, setCountryArr] = useState([]);

	const [prevButton, setPrevButton] = useState();

	const containerRef = useRef();

	function toggleROIList(e, name){
		
		if(e.currentTarget.className === 'Edit-ROI-Selector-Button'){
			setShowROIList(true);
			e.currentTarget.className = 'Edit-ROI-Selector-Button-Active';
			getAllCountryROI(name).then(res=>{
				setSelectedCountryROI(res.data);
				
			})
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					if(localArr[i].id === prevButton){
						localArr[i].className = 'Edit-ROI-Selector-Button';
					}
				}
				
			}
			
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'Edit-ROI-Selector-Button';
			setSelectedCountryROI([]);
			setShowROIList(false);
		}
	}

	function editForm(e, roiData){
		
		if(e.currentTarget.className === 'Edit-ROI-Selector-Button'){
			setToggleEditForm(true);
			setID(roiData._id);
			setName(roiData.country_name);
			setCandidates(roiData.country_candidates);
			setPermits(roiData.country_permits);
			setInvitations(roiData.country_permits);
			setDate(roiData.country_date);
			e.currentTarget.className = 'Edit-ROI-Selector-Button-Active';
			if(prevButton !== null || typeof prevButton !== 'undefined'){
				var localArr = containerRef.current.childNodes;
				for(let i=0; i <localArr.length; i++){
					if(localArr[i].id === prevButton){
						localArr[i].className = 'Edit-ROI-Selector-Button';
					}
				}
				
			}
			
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'Edit-ROI-Selector-Button';
			setToggleEditForm(false);
			setID('');
			setName('');
			setCandidates('');
			setPermits('');
			setInvitations('');
			setDate('');
		}
	}
	

	function handleBackButton(){
		setShowROIList(false);
		setSelectedCountryROI([]);
		setSearchValue('');
	}

	function onUpdate(e){
		e.preventDefault();

		axios.put(`roi/${id}`, {
			country_name: name,
    		country_candidates: candidates,
    		country_permits: permits,
    		country_invitations: invitations,
    		country_date: date
		  })
		  .then(function (response) {
			console.log(response);
			setName('');
			setCandidates('');
			setPermits('');
			setInvitations('');
			setDate('');
			showForm(false);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	useEffect(()=>{
		if(initLoad){
			getData().then(res=>{
				setOriginalCountryArr(res.data);
				setCountryArr(res.data);
	
			})
			
			setInitLoad(false);	
			
		}
	},[]);

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


	return (
    <>
      <h1 className="Edit-ROI-Title">Edit Round of Invitations</h1>
      <div className="Edit-ROI-Wrapper">
        <div className="Edit-ROI-Country-Selector" ref={containerRef}>
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
            className="Edit-ROI-Country-Selector-Search"
          />
          {showROIList
            ? selectedCountryROI.map((roi) => (
                <button
                  key={roi._id}
                  className="Edit-ROI-Selector-Button"
                  id={roi._id}
                  onClick={(e) => editForm(e, roi)}
                >
                  {roi.country_date}
                </button>
              ))
            : countryArr.map((country) => (
                <button
                  key={country.country_name}
                  className="Edit-ROI-Selector-Button"
                  id={country._id}
                  onClick={(e) => toggleROIList(e, country.country_name)}
                >
                  {country.country_name}
                </button>
              ))}
          :
        </div>
        <form className="Edit-ROI-Form">
          {toggleEditForm ? (
            <>
              <input
                type="text"
                placeholder="Candidates"
                value={candidates}
                onChange={(e) => setCandidates(e.currentTarget.value)}
              />
              <input
                type="text"
                placeholder="Permits Left"
                value={permits}
                onChange={(e) => setPermits(e.currentTarget.value)}
              />
              <input
                type="text"
                placeholder="Invitations"
                value={invitations}
                onChange={(e) => setInvitations(e.currentTarget.value)}
              />
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.currentTarget.value)}
              />
              <input
                type="submit"
                className="ROI-Submit-Button"
                onClick={(e) => onUpdate(e)}
              />
            </>
          ) : null}
        </form>
      </div>
    </>
  );

}
export default EditROIForm;