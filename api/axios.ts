import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || error.message || "An error occurred";
        console.error("[API Error]:", message);
        return Promise.reject(error);
    }
);

export default apiClient;
