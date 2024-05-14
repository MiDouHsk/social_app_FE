import axios from 'axios';
import { Url } from '../service/constants';

const BASE_URL = `${Url}`;

const userService = {
    getUserDetails: async (accessToken) => {
        try {
            const response = await axios.get(`${BASE_URL}user/profile`, {
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
