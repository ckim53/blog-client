import React from 'react';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { Text, Box, Button, Group } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';
import { useApiFetch } from '../services/apiFetch';
import { API_URL } from '../services/api';
import { IconCoffee } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const [posts, setPosts] = useState([]);
	const { isAuthenticated, user, logout, login } = useAuth();
	const apiFetch = useApiFetch();
	const navigate = useNavigate();

	useEffect(() => {
		apiFetch(`${API_URL}/posts`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		})
			.then((res) => res.json())
			.then((json) => setPosts(json.data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {}, [user]);

	const handleLog = () => {
		if (isAuthenticated) {
			logout();
			navigate('/');
		} else {
			navigate('/log-in');
		}
	};

	return (
		<Box px={50}>
			<Group>
				<Text
					mb={20}
					c="white"
					style={{
						fontSize: '45px',
						fontWeight: 'bold',
					}}
				>
					Coffee Break{' '}
				</Text>
				<IconCoffee
					style={{
						marginBottom: '25px',
						color: 'white',
					}}
					size={45}
				></IconCoffee>
			</Group>
			<Button
				onClick={handleLog}
				color="white"
				variant="subtle"
				radius="md"
				size="lg"
				style={{ position: 'absolute', top: '50px', right: '50px' }}
			>
				{isAuthenticated ? 'Log Out' : 'Log In'}
			</Button>

			<Box className="posts-grid">
				{posts.map((p) => (
					<PostCard key={p.id} post={p} />
				))}
			</Box>
		</Box>
	);
}

export default Home;
