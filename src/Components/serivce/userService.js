import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const userService = {
    getUserDetails: async (accessToken) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default userService;
