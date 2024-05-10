import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Context from '../context/Context'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { IoLogInOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
    const auth = useContext(Context);
    const navigate = useNavigate();
    const logOut = async () => {
        const api = await axios.get(
            `https://react-mern-wdm.onrender.com/api/users/logOut`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        // console.log(api);
        toast.success(api.data.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        auth.setisAuthenticated(false);
        setTimeout(() => {
            navigate('/')
        }, 1500);
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="navbar">
                <Link to={'/'} className="left">
                    <h2>MERN_Blog_App</h2>
                </Link>
                <div className="right">
                    {
                    (!auth.isAuthenticated)&&
                    <Link to={'/login'} className='items'>
                    <h3><IoLogInOutline /></h3>
                    </Link>
                    }
                    {
                    (!auth.isAuthenticated)&&
                    <Link to={'/register'} className='items'>
                        <h3>Register</h3>
                    </Link>
                    }
                    {
                    (auth.isAuthenticated)&&
                    <Link to={'/addblog'} className='items'>
                        <h3>AddBlog</h3>
                    </Link>
                    }
                    {
                    (auth.isAuthenticated)&&
                    <Link to={'/profile'} className='items'>
                        <h3><FaRegUserCircle/></h3>
                    </Link>
                    }
                    {
                    (auth.isAuthenticated)&&
                    <div onClick={logOut} className='items' style={{cursor:'pointer'}}><h3><CiLogout /></h3></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar