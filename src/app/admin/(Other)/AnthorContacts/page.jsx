'use client';

import { useEffect, useState } from 'react';
import Styles from './AnthorContacts.module.css';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

const AnthorContacts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editing, setEditing] = useState(false);
    const router = useRouter();

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
                setSelectedPost(null);
                setEditing(false);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedPost({ ...selectedPost, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleUpdate(selectedPost._id, selectedPost);
    };

    const handleViewMore = (post) => {
        setSelectedPost(post);
        setEditing(false);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setEditing(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <main className={Styles.main}>
            <h1>Admin Page</h1>
            <ul className={Styles.blockInfo}>
                {posts.map(post => (
                    <div key={post._id} className={Styles.postItem}>
                        <p><strong>Имя:</strong> {post.name}</p>
                        <p><strong>Почта:</strong> {post.email}</p>
                        <p><strong>Телефон:</strong> {post.phone}</p>
                        <p><strong>Название книги:</strong> {post.bookTitle}</p>
                        <p><strong>Количество страниц:</strong> {post.pageCount}</p>
                        <p><strong>Описание:</strong> {post.description}</p>
                        
                        <button onClick={() => handleViewMore(post)} className="p-1 mt-2 bg-blue-500 hover:bg-blue-700 mr-3">Подробнее</button>
                        <button onClick={() => handleDelete(post._id)} className="p-1 bg-red-700 mt-2 hover:bg-red-900 mr-3">Удалить</button>
                    </div>
                ))}
            </ul>

            {selectedPost && (
                <Modal
                    isOpen={!!selectedPost}
                    onRequestClose={closeModal}
                    contentLabel="Post Details"
                    className={Styles.modal}
                    overlayClassName={Styles.overlay}
                >
                    
                    {!editing ? (
                        <div>
                            <p><strong>Имя:</strong> {selectedPost.name}</p>
                            <p><strong>Почта:</strong> {selectedPost.email}</p>
                            <p><strong>Телефон:</strong> {selectedPost.phone}</p>
                            <p><strong>Название книги:</strong> {selectedPost.bookTitle}</p>
                            <p><strong>Количество страниц:</strong> {selectedPost.pageCount}</p>
                            <p><strong>Описание:</strong> {selectedPost.description}</p>
                            <button onClick={handleEditClick} className="p-1 mt-2 bg-blue-900 hover:bg-teal-950">Изменить</button>
                        </div>
                    ) : (
                        <form onSubmit={handleEditSubmit} className={Styles.editForm}>
                            <input
                                type="text"
                                name="name"
                                value={selectedPost.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={selectedPost.email}
                                onChange={handleEditChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={selectedPost.phone}
                                onChange={handleEditChange}
                                placeholder="Phone"
                                required
                            />
                            <input
                                type="text"
                                name="bookTitle"
                                value={selectedPost.bookTitle}
                                onChange={handleEditChange}
                                placeholder="Book Title"
                                required
                            />
                            <input
                                type="number"
                                name="pageCount"
                                value={selectedPost.pageCount}
                                onChange={handleEditChange}
                                placeholder="Page Count"
                                required
                            />
                            <textarea
                                name="description"
                                value={selectedPost.description}
                                onChange={handleEditChange}
                                placeholder="Description"
                                required
                            />
                            <button type="submit">Сохранить</button>
                            <button type="button" onClick={closeModal}>Отмена</button>
                        </form>
                    )}
                </Modal>
            )}
        </main>
    );
};

export default AnthorContacts;
