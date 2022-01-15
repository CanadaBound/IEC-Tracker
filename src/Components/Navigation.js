import '../CSS/Navigation.css';
function Navigation(){

return(
	<>
		<header className="Header-Container">
			<nav className="Navigation-Menu">
				<button className="History-Button">
					<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24">
						<path fill='#fff' d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z"/>
					</svg>
				</button>
			</nav>
			<div className="Title-Container">
				<h1 className="Title">IEC Tracker</h1>
					<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="-2015 -2000 4030 4030">
						<path fill="#f00" d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"/>
					</svg>
			</div>
			
		</header>
	</>
);

}

export default Navigation;