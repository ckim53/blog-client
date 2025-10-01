import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const decoded = jwtDecode(token);

			if (decoded.exp * 1000 > Date.now()) {
				setIsAuthenticated(true);
				setUser({ id: decoded.id, username: decoded.username });
			} else {
				localStorage.removeItem('token');
			}
		} catch (err) {
			console.error('Invalid token', err);
			localStorage.removeItem('token');
		}
	}, []);

	return { isAuthenticated, user };
}
