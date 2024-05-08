import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
const UserDetail = ({ id }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const api = await axios.get(
                `https://react-mern-wdm.onrender.com/api/users/${id}`, {
                headers: {
                    "Content-type": "application/json"
                },
                withCredentials: true
            }
            );
            // console.log(api.data.user);
            setUser(api.data.user);
        };

        fetchUser();
    }, []);
    return (
        <>
        <h3><FaRegUserCircle />{" "}{user.name}</h3>
        <h3><MdOutlineEmail /> {" "} {user.email}</h3>
        </>
    )
}

export default UserDetail