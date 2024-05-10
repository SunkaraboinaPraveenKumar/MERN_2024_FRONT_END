import React,{useContext, useEffect} from 'react'
import Context from '../context/Context';
import axios from 'axios';
import MyBlogs from '../components/MyBlogs';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Profile = () => {
    const auth=useContext(Context);
    useEffect(() => {
        const fetchUser = async () => {
            const api = await axios.get(
                `https://react-mern-wdm.onrender.com/api/users/myprofile`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            // console.log(api.data.user);
            // setBlog(response.data.blogs);
            auth.setUser(api.data.user);
            auth.setisAuthenticated(true);
        };

        fetchUser();
    }, []);
  return (
    <div className='text-center my-3'>
        <h1><FaRegUserCircle />{" "}{auth.user.name}</h1>
        <h1><MdOutlineEmail /> {" "} {auth.user.email}</h1>
        <MyBlogs />
    </div>
  )
}

export default Profile