// src/components/PostCard.jsx
import { Link } from 'react-router-dom';

function formatDate(iso) {
	if (!iso) return '';
	return new Date(iso).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});
}

export default function PostCard({ post }) {
	const authorName =
		post?.author?.displayName || post?.author?.username || 'Unknown';
	const commentCount = Array.isArray(post?.comments) ? post.comments.length : 0;
	const preview =
		(post?.content || '').length > 140
			? `${post.content.slice(0, 140)}…`
			: post?.content || '';

	return (
		<article
			className="post-card"
			style={{
				border: '1px solid #eee',
				borderRadius: 8,
				padding: 16,
				marginBottom: 12,
			}}
		>
			<header style={{ marginBottom: 8 }}>
				<h2 style={{ margin: 0 }}>
					<Link to={`/posts/${post.id}`}>{post.title}</Link>
				</h2>
				<small>
					By {authorName} • {formatDate(post?.createdAt)} • {commentCount}{' '}
					comment
					{commentCount === 1 ? '' : 's'}
				</small>
			</header>
			<p style={{ margin: 0 }}>{preview}</p>
		</article>
	);
}
