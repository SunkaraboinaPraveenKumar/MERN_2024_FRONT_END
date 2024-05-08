import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetail from '../components/UserDetail';

const Home = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await axios.get(
                `https://react-mern-wdm.onrender.com/api/blogs/allblogs`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            console.log(response.data.blogs);
            setBlog(response.data.blogs);
        };

        fetchBlog();
    }, []);

    return (
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
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
