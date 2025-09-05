import { getPosts } from '../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

function Home() {
	console.log('Home component mounted');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts()
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);
	return (
		<div>
			<Link to={'/log-in'}>Log In</Link>
			<br />
			<Link to="/sign-up">
				Want to share your thoughts? <strong>Join as a Contributor</strong>
			</Link>
			<h1>Welcome to the Blog</h1>
			{posts.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
		</div>
	);
}

export default Home;
