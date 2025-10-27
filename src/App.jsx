import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetails from './pages/PostDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import { AuthProvider } from './auth/AuthProvider';
import DetailsLayout from './components/DetailsLayout';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/log-in" element={<Login />} />
						<Route path="/sign-up" element={<SignUp />} />
					</Route>
					<Route element={<DetailsLayout />}>
						<Route path="/posts/:id" element={<PostDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
