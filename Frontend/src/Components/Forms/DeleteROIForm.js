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

	const [prevButton, setPrevButton] = useState();

	const containerRef = useRef();

	function onDelete(e,id){
		e.preventDefault();
		axios.delete(`roi/${id}`);
	}

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
					if(localArr[i].id === prevButton){
						localArr[i].className = 'Delete-ROI-Selector-Button';
					}
				}
				
			}
			
			setPrevButton(e.currentTarget.id);
		}
		else{
			e.currentTarget.className = 'Delete-ROI-Selector-Button';
			setSelectedCountryROI([]);
			setShowROIList(false);
		}
	}


	
	

	function handleBackButton(){
		setShowROIList(false);
		setSelectedCountryROI([]);
		setSearchValue('');
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