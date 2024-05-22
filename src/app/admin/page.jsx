'use client';

import { useEffect, useState } from 'react'
import Styles from './Admin.module.css'

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
        <main className={Styles.main}>
            <h1>Admin Page</h1>
            <ul className={Styles.blockInfo}>
                {posts.map(post => (
                    <li key={post._id} className={Styles.postItem}>
                        <div>
                            <strong>Имя:</strong> {post.name}
                        </div>
                        <div>
                            <strong>Почта:</strong> {post.email}
                        </div>
                        <div>
                            <strong>Номер телефона:</strong> {post.phone}
                        </div>
                        <div>
                            <strong>Название:</strong> {post.bookTitle}
                        </div>
                        <div>
                            <strong>Количество страниц:</strong> {post.pageCount}
                        </div>
                        <div>
                            <strong>Описание:</strong> {post.description}
                        </div>
                        <button onClick={() => handleDelete(post._id)}className='p-1 bg-red-700 mt-2 hover:bg-red-900 mr-3 '>Удалить</button>
                        <button onClick={() => handleEditClick(post)}className='p-1 mt-2 bg-emerald-800 hover:bg-teal-900'>Изменить</button>
                    </li>
                ))}
            </ul>
            {editingPost && (
                <form onSubmit={handleEditSubmit} className={Styles.editForm}>
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
        </main>
    );
};

export default AdminPage;
