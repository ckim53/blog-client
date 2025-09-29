import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
	return (
		<div className="layout">
			<header className="header">
				<h1 className="logo">My Blog</h1>
				<nav className="nav">
					<Link to="/">Home</Link>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/log-in">Log In</Link>
					<Link to="/sign-up">Sign Up</Link>
				</nav>
			</header>

			<main className="main">
				<Outlet />
			</main>

			<footer className="footer">
				<p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
			</footer>
		</div>
	);
}
