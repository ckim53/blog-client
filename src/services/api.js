const API_URL = 'http://localhost:3000';

export async function getPosts() {
	const res = await fetch(`${API_URL}/posts`);
	const json = await res.json();
	return json.data;
}
