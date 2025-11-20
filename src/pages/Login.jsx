import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../services/api';
import { Button, Text, Group, Title, Input, Box } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useAuth();

	const navigate = useNavigate();

	const handleDemo = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${API_URL}/demo`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ guest: true }),
			});

			const data = await res.json();

			if (res.ok && data.ok) {
				login(data);
				window.dispatchEvent(new Event('authChange'));
				navigate(`/`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const res = await fetch(`${API_URL}/log-in`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (res.ok && data.ok) {
				login(data);
				setError('');
				window.dispatchEvent(new Event('authChange'));
				navigate(`/`);
			} else {
				setError(data.error || 'Login failed. Please try again.');
			}
		} catch (err) {
			console.log(err);
			setError('Could not connect to server. Please try again later.');
		}
	};

	return (
		<Box ta="center" mt={30}>
			<form onSubmit={handleSubmit}>
				<Box c="white" td="none">
					<Title order={1}>Login</Title>
					{/* <Title order={2}>
						<Group my="10px" justify="center">
							<Text size="lg">Don't have an account?</Text>
							<Text
								size="lg"
								component={Link}
								to="/sign-up"
								style={{
									color: 'white',
									textDecoration: 'none',
									fontWeight: 'bold',
								}}
							>
								Sign Up or
							</Text>
							<Text
								size="lg"
								style={{
									color: 'white',
									textDecoration: 'none',
									fontWeight: 'bold',
								}}
							>
								Log In as Guest
							</Text>
						</Group>
					</Title> */}
					<Title order={2}>
						<Group my="10px" justify="center">
							<Text size="lg">Don't have an account?</Text>
						</Group>
						<Group>
							<Text
								size="lg"
								component={Link}
								to="/sign-up"
								style={{
									color: 'white',
									textDecoration: 'none',
									fontWeight: 'bold',
									transition: 'color 0.2s',
								}}
								onMouseEnter={(e) => (e.target.style.color = '#b3e5fc')}
								onMouseLeave={(e) => (e.target.style.color = 'white')}
							>
								Sign Up
							</Text>
							<Text size="lg">or</Text>
							<Text
								size="lg"
								component={Link}
								to="/guest-login"
								style={{
									color: 'white',
									textDecoration: 'none',
									fontWeight: 'bold',
									marginLeft: '6px',
									transition: 'color 0.2s',
								}}
								onMouseEnter={(e) => (e.target.style.color = '#b3e5fc')}
								onMouseLeave={(e) => (e.target.style.color = 'white')}
								onClick={handleDemo}
							>
								Log In as Guest
							</Text>
						</Group>
					</Title>

					{error &&
						error.split(';').map((msg, i) => (
							<p key={i} style={{ color: 'red', margin: 0 }}>
								{msg.trim()}
							</p>
						))}
					<Input
						my="lg"
						size="md"
						radius="md"
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></Input>
					<Input
						my="lg"
						size="md"
						radius="md"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Input>
					<Button
						type="submit"
						style={{ backgroundColor: '#2e949f' }}
						size="lg"
						p="sm"
						radius="md"
						my="md"
					>
						Log In
					</Button>
				</Box>
			</form>
			<Title
				td="none"
				component={Link}
				to="/"
				c="white"
				fontWeight={700}
				order={5}
			>
				Back to Home
			</Title>
		</Box>
	);
}
