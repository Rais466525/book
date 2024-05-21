'use client';

import React, { useState, useEffect } from 'react';
import Styles from './AdminBooks.module.css';

const AdminBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch('/api/books');
            const result = await res.json();
            if (result.success) {
                setBooks(result.data);
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
            const res = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.success) {
                setBooks(books.filter(book => book._id !== id));
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async (id, updatedBook) => {
        try {
            const res = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });
            const result = await res.json();
            if (result.success) {
                setBooks(books.map(book => (book._id === id ? result.data : book)));
                setEditingBook(null);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (book) => {
        setEditingBook(book);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingBook({ ...editingBook, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editingBook._id, editingBook);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={Styles.adminBooksContainer}>
            <h1>Admin Books Page</h1>
            <ul>
                {books.map(book => (
                    <li key={book._id} className={Styles.bookItem}>
                        <img src={book.coverImageUrl} alt={book.title} className={Styles.coverImage} />
                        <div>
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p>{book.description}</p>
                            <p><strong>Price:</strong> ${book.price}</p>
                        </div>
                        <button onClick={() => handleDelete(book._id)}>Delete</button>
                        <button onClick={() => handleEditClick(book)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingBook && (
                <form onSubmit={handleEditSubmit} className={Styles.editForm}>
                    <h2>Edit Book</h2>
                    <input
                        type="text"
                        name="title"
                        value={editingBook.title}
                        onChange={handleEditChange}
                        placeholder="Title"
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        value={editingBook.author}
                        onChange={handleEditChange}
                        placeholder="Author"
                        required
                    />
                    <textarea
                        name="description"
                        value={editingBook.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={editingBook.price}
                        onChange={handleEditChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="text"
                        name="coverImageUrl"
                        value={editingBook.coverImageUrl}
                        onChange={handleEditChange}
                        placeholder="Cover Image URL"
                        required
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default AdminBooksPage;
