'use client';

import React, { useState, useEffect } from 'react';
import Styles from './Admin.module.css';

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPost, setEditingPost] = useState(null);

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
                setEditingPost(null);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (post) => {
        setEditingPost(post);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingPost({ ...editingPost, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editingPost._id, editingPost);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={Styles.adminContainer}>
            <h1>Admin Page</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id} className={Styles.postItem}>
                        <div>
                            <strong>Name:</strong> {post.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {post.email}
                        </div>
                        <div>
                            <strong>Phone:</strong> {post.phone}
                        </div>
                        <div>
                            <strong>Book Title:</strong> {post.bookTitle}
                        </div>
                        <div>
                            <strong>Page Count:</strong> {post.pageCount}
                        </div>
                        <div>
                            <strong>Description:</strong> {post.description}
                        </div>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                        <button onClick={() => handleEditClick(post)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingPost && (
                <form onSubmit={handleEditSubmit} className={Styles.editForm}>
                    <h2>Edit Post</h2>
                    <input
                        type="text"
                        name="name"
                        value={editingPost.name}
                        onChange={handleEditChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={editingPost.email}
                        onChange={handleEditChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={editingPost.phone}
                        onChange={handleEditChange}
                        placeholder="Phone"
                        required
                    />
                    <input
                        type="text"
                        name="bookTitle"
                        value={editingPost.bookTitle}
                        onChange={handleEditChange}
                        placeholder="Book Title"
                        required
                    />
                    <input
                        type="number"
                        name="pageCount"
                        value={editingPost.pageCount}
                        onChange={handleEditChange}
                        placeholder="Page Count"
                        required
                    />
                    <textarea
                        name="description"
                        value={editingPost.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                        required
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setEditingPost(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default AdminPage;
