// SummaryApi.js
export const baseURL = "http://localhost:8080"; // or whatever your backend port is

const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post",
    },
};

export default SummaryApi;
