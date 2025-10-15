import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import useAuth from '../../hooks/useAuth';

export default function Sidebar({ isAuth, onLogout }) {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<div className="sidebar">
			<Link className="logo" to="/">
				My Blog
			</Link>
			<nav>
				<TextInput
					placeholder="Search..."
					icon={<IconSearch size={20} />}
					size="md"
					radius="md"
				/>
				{isAuthenticated ? (
					<ul>
						<li>
							<button onClick={handleLogout}>Log Out</button>
						</li>
					</ul>
				) : (
					<ul>
						<li>
							<Link to="/log-in">Log In</Link>
						</li>
						<li>
							<Link to="/sign-up">Sign Up</Link>
						</li>
					</ul>
				)}
			</nav>
		</div>
	);
}
