import '../CSS/Card.css';
function Card(){

	return(
		<button className="Card-Border">
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
		</button>
	);
}
export default Card;