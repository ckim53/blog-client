import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
	return (
		<div className="layout">
			<header className="header">
				<Link to="/" id="home">
					<h1 className="logo">My Blog</h1>
				</Link>
				<nav className="nav">
					<Link to="/log-in">Log In</Link>
				</nav>
			</header>

			<main className="main">
				<Outlet />
			</main>
		</div>
	);
}
