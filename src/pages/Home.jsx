import { getPosts } from '../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';

function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts()
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div style={{ padding: '1rem' }}>
			<nav style={{ marginBottom: '1rem' }}>
				<br />
				Want to share your thoughts?{'  '}
				<Link to="/sign-up">
					<strong>Join as a Contributor</strong>
				</Link>
			</nav>

			<h1>Welcome to the Blog</h1>

			<div className="posts-grid">
				{posts.map((p) => (
					<PostCard key={p.id} post={p} />
				))}
			</div>
		</div>
	);
}

export default Home;
