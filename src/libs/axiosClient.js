import axios from "axios";

// export const baseURL = "https://ebizmart-backend.herokuapp.com";
export const baseURL = "http://localhost:5000";
// export const baseURL = "http://5943-103-149-126-82.ngrok.io";

export const frontUrl = "http://localhost:3000";

let clientFetch = axios.create({
	baseURL,
});

export const createTokenizedFetch = (token) => {
	clientFetch = axios.create({
		baseURL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const setNormalFetch = () => {
	clientFetch = axios.create({
		baseURL,
	});
};

export const serverFetch = () => {
	return axios.create({
		baseURL,
	});
};

const getFetch = () => {
	return clientFetch;
};

export default getFetch;
