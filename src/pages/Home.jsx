import React from 'react';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { Text, Box, Button, Group, Loader, Center } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';
import { useApiFetch } from '../services/apiFetch';
import { API_URL } from '../services/api';
import { IconCoffee, IconExternalLink } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isAuthenticated, user, logout, loadingAuth } = useAuth();
	const apiFetch = useApiFetch();
	const navigate = useNavigate();
	console.log('API URL:', import.meta.env.VITE_API_URL);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 300);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		apiFetch(`${API_URL}/posts`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('POSTS RESPONSE:', json);
				setPosts(json.data);
			})
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

	if (loading || loadingAuth || !user) {
		return (
			<Center mt={200}>
				<Loader color="blue" />
			</Center>
		);
	}

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
						color: '#BF94E4',
					}}
					size={45}
				></IconCoffee>
				<Button
					component={Link}
					to="https://coffee-break-cms.up.railway.app"
					radius="md"
					size="md"
					mb="md"
					mx="lg"
				>
					Manage Posts <IconExternalLink style={{ marginLeft: '5px' }} />
				</Button>
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
