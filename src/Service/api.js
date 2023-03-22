import axios from 'axios';

// export const usersUrl = 'http://localhost:8000/api'
export const usersUrl = 'https://red-positive.onrender.com/api';

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(usersUrl, user);
}

export const editUser = async (id, user) => {
    return await axios.patch(`${usersUrl}/${id}`, user)
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`)
}