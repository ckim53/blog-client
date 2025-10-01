import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PostDetails() {
	const { id } = useParams();
	const { isAuthenticated, loading } = useAuth();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [content, setContent] = useState('');
	const token = localStorage.getItem('token');

	const fetchComments = async () => {
		try {
			const res = await fetch(`http://localhost:3000/posts/${id}/comments`);
			const json = await res.json();
			setComments(json.data || []);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetch(`http://localhost:3000/posts/${id}`)
			.then((res) => res.json())
			.then((json) => setPost(json.data));
	}, [id]);

	useEffect(() => {
		fetch(`http://localhost:3000/posts/${id}/comments`)
			.then((res) => res.json())
			.then((json) => setComments(json.data || []))
			.catch((err) => console.error(err));
	}, [id]);

	if (!post) return <p>Loading...</p>;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`http://localhost:3000/posts/${id}/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					content,
				}),
			});

			let data;
			const text = await res.text();
			try {
				data = JSON.parse(text);
			} catch {
				data = text;
			}

			if (res.ok) {
				await fetchComments();
				setContent('');
			} else {
				if (res.status === 400 || res.status === 401) {
					alert('You must be logged in to comment on posts.');
				} else {
					alert(
						`Failed to add comment. Status: ${res.status}, Error: ${data.error || data}`
					);
				}
				setContent('');
			}
		} catch (err) {
			alert('Server error. Try again later.');
		}
	};

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<h2>
				{comments.length} {comments.length == 1 ? 'Comment' : 'Comments'}{' '}
			</h2>
			{comments && comments.length === 0 ? (
				<p>No comments yet</p>
			) : (
				comments.map((c) => (
					<div key={c.id}>
						<strong>{c.author.username}</strong>
						<p>{c.content}</p>
					</div>
				))
			)}
			<h3>Add a Comment</h3>
			{isAuthenticated ? (
				<form onSubmit={handleSubmit}>
					<textarea
						placeholder="Your comment"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
					<br />
					<button type="submit">Post Comment</button>
				</form>
			) : (
				<p style={{ color: 'gray' }}>
					<a href="/log-in">Log in</a> to add a comment.
				</p>
			)}
		</div>
	);
}

export default PostDetails;
