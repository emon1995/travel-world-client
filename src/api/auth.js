import axios from "axios"


// get role 
export const getRole = async (email) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${email}`);
    return res?.data?.role;
}