import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');

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

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<h2>Comments</h2>
			{comments && comments.length === 0 ? (
				<p>No comments yet</p>
			) : (
				comments.map((c) => (
					<div key={c.id}>
						<strong>{c.author}</strong>
						<p>{c.text}</p>
					</div>
				))
			)}
			<h3>Add a Comment</h3>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					const res = await fetch(
						`http://localhost:3000/posts/${id}/comments`,
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ author, text }),
						}
					);

					if (res.ok) {
						const newComment = await res.json();
						setComments([...comments, newComment]);
						setAuthor('');
						setText('');
					}
				}}
			>
				<input
					type="text"
					placeholder="Your name"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					required
				/>
				<br></br>
				<textarea
					placeholder="Your comment"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<button type="submit">Post Comment</button>
			</form>
		</div>
	);
}

export default PostDetails;
