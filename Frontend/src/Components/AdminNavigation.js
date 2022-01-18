import '../CSS/Navigation.css';
import {useNavigate, Link} from 'react-router-dom';
function AdminNavigation(){


return(
	<>
		<header className="Header-Container">
			<nav className="Navigation-Menu">
				<Link to='/' className="Home-Button">
				<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24"><path fill='#fff' d="M12 1l-12 12h3v10h18v-10h3l-12-12zm0 18c-1.607-1.626-3-2.84-3-4.027 0-1.721 2.427-2.166 3-.473.574-1.695 3-1.246 3 .473 0 1.187-1.393 2.402-3 4.027zm8-11.907l-3-3v-2.093h3v5.093z"/></svg>
				</Link>

			</nav>
			<div className="Title-Container">
				<h1 className="Title">Admin Dashboard</h1>
					<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="-2015 -2000 4030 4030">
						<path fill="#f00" d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"/>
					</svg>
			</div>
			
		</header>
	</>
);

}

export default AdminNavigation;