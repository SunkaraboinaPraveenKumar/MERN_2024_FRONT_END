import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const auth = useContext(Context);
    const navigate = useNavigate();
    // console.log(auth);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    useEffect(() => {
        const fetchBlog = async () => {
            const api = await axios.get(
                `https://react-mern-wdm.onrender.com/api/blogs/blog/${auth.id}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            // console.log(api.data.blog);
            setTitle(api.data.blog.title);
            setDescription(api.data.blog.description);
            setImgUrl(api.data.blog.imgUrl);
        };

        fetchBlog();
    }, [auth.id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.id) {
            try {
                const api = await axios.post(
                    `https://react-mern-wdm.onrender.com/api/blogs/new`, {
                    title,
                    description,
                    imgUrl
                },
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
                    transition: Bounce,
                });
                auth.setisAuthenticated(true)
                setTimeout(() => {
                    navigate('/profile')
                }, 1500);
            }
            catch (error) {
                // console.error(error);
                toast.error(error.response.data.message, {
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
            }
        }
        else {
            try {
                const api = await axios.put(
                    `https://react-mern-wdm.onrender.com/api/blogs/${auth.id}`, {
                    title,
                    description,
                    imgUrl
                },
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
                    transition: Bounce,
                });
                auth.setisAuthenticated(true)
                setTimeout(() => {
                    navigate('/profile')
                }, 1500);
                auth.setId("");
            }
            catch (error) {
                // console.error(error);
                toast.error(error.response.data.message, {
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
            }
        }
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
                transition:Bounce
            />
            <div className="container mt-5" style={{ width: '45%' }}>
                {
                    (auth.id) ? (<h1 className='text-center'>Edit Blog</h1>) : (<h1 className='text-center'>Add Blog</h1>)
                }
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                        <label htmlFor="exampleInputName" className="form-label">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">ImgUrl</label>
                        <input
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="d-grid gap-2 my-5">
                        {
                            (auth.id)?(<button className="btn btn-primary" type="submit">Edit Blog</button>):(<button className="btn btn-primary" type="submit">Add Blog</button>)
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBlog