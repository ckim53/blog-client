import { useState } from 'react';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

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
				localStorage.setItem('token', data.token);
				alert('Logged in!');
				setError('');
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
