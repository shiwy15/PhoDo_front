// Logout.jsx
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils/axios-utils';

export const HandleLogout = async (navigate) => { // Add navigate parameter
    try {
        const response = await request({
            url: '/logout',
            method: 'GET'
        });

        if (response.status === 200) {
            console.log('Logged out!');
            navigate('/');
        } else {
            console.log('Logout failed');
        }
    } catch (error) {
        console.log('Error during logout:', error);
    }
};
