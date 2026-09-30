import axios from "axios";

// Shared Axios instance for the local JSON Server Mock API (mock-api/db.json).
// Start it with:  npm run mock-api   ->  http://localhost:5000
const api = axios.create({
    baseURL: "http://localhost:5000"
});

export default api;
