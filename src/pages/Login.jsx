import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const res = await fetch('http://localhost:3000/log-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (res.ok && data.ok) {
				console.log(`userid: ${data.user.id}`);
				localStorage.setItem('userId', data.user.id);
				localStorage.setItem('username', data.user.username);
				localStorage.setItem('token', data.token);
				setError('');
				navigate('/dashboard');
			} else {
				setError(data.error || 'Login failed. Please try again.');
			}
		} catch (err) {
			setError('Could not connect to server. Please try again later.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<br />
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br />
			<button type="submit">Log In</button>
		</form>
	);
}
