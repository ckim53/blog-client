import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from '../services/api';
import { PostCard } from '../components/PostCard';

function Dashboard() {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getPosts()
			.then((data) => setPosts(data || []))
			.catch(console.error);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div>
			{posts.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
			<button id="logout" onClick={handleLogout}>Log Out</button>
		</div>
	);
}

export default Dashboard;
