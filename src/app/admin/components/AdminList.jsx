'use client';

import React, { useState, useEffect } from 'react';
import Styles from './Admin.module.css';

const AdminList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            const result = await res.json();
            if (result.success) {
                setPosts(result.data);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.success) {
                setPosts(posts.filter(post => post._id !== id));
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async (id, updatedPost) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            });
            const result = await res.json();
            if (result.success) {
                setPosts(posts.map(post => (post._id === id ? result.data : post)));
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={Styles.adminContainer}>
            <h1>Admin Page</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.bookTitle}</h2>
                        <p>{post.description}</p>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                        <button onClick={() => handleUpdate(post._id, {
                            name: 'Updated Name',
                            email: 'updated@example.com',
                            phone: '1234567890',
                            bookTitle: 'Updated Book Title',
                            pageCount: 123,
                            description: 'Updated Description'
                        })}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;
