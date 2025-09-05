import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetails from './pages/PostDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts/:id" element={<PostDetails />} />
				<Route path="/log-in" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
