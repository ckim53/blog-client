import { getPosts } from '../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import './home.css';
function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts()
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="home" style={{ padding: '1rem' }}>
			<nav id="description"></nav>
			<div className="posts-grid">
				{posts.map((p) => (
					<PostCard key={p.id} post={p} />
				))}
			</div>
		</div>
	);
}

export default Home;
