import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const [blog, setBlog] = useState([]);
    const navigate=useNavigate();
    const auth=useContext(Context);
    useEffect(() => {
        const fetchBlog = async () => {
            const api = await axios.get(
                `https://react-mern-wdm.onrender.com/api/blogs/myblogs`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            // console.log(api.data.blogs);
            setBlog(api.data.blogs);
        };

        fetchBlog();
    }, []);
    const deleteBlog = async (id) => {
        try {
          const response = await axios.delete(
            `https://react-mern-wdm.onrender.com/api/blogs/${id}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
      
          if (response.status === 200) {
            // toast.success(response.data.message, {
            //   position: "top-center",
            //   autoClose: 1500,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   theme: "dark",
            // });
      
            // Update state to remove deleted blog
            setBlog(blog.filter((b) => b._id !== id));
      
            // Navigate after success
            setTimeout(() => {
              navigate('/profile');
            }, 1500);
          } else {
            throw new Error("Failed to delete blog");
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          toast.error("An error occurred during deletion.", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
          });
        }
      };      
    const editBlog = async (id)=>{
        auth.setId(id);
        navigate('/addblog');
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
            <div className="container my-5 text-center" style={{ width: '56%' }}>
                {blog.map((data) => (
                    <div key={data._id} className="card mb-3 my-5" style={{ maxWidth: '760px' }}>
                        <div className="row g-0">
                            <div className="col-md-4" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img src={data.imgUrl} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h2 className="card-title">{data.title}</h2>
                                    <p className="card-text">{data.description}</p>
                                    <p className="card-text">
                                        <small>{new Date(data.createdAt).toLocaleDateString()}</small>
                                    </p>
                                    <UserDetail id={data.user} />
                                    <div class="del-edit">
                                    <button onClick={()=>editBlog(data._id)} className='btn btn-warning mx-5 edit'>Edit</button>
                                    <button onClick={() => deleteBlog(data._id)} className='btn btn-danger del'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MyBlogs;