'use client';

import React, { useState } from 'react';
import Styles from './AddBook.module.css';

const AddBookPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        coverImageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to add book');
            }

            const result = await res.json();
            console.log(result);

            // Очистить форму после успешной отправки
            setFormData({
                title: '',
                author: '',
                description: '',
                price: '',
                coverImageUrl: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={Styles.addBookContainer}>
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit} className={Styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className={Styles.input}
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    required
                    className={Styles.input}
                    value={formData.author}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    required
                    className={Styles.textarea}
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                    className={Styles.input}
                    value={formData.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="coverImageUrl"
                    placeholder="Cover Image URL"
                    required
                    className={Styles.input}
                    value={formData.coverImageUrl}
                    onChange={handleChange}
                />
                <button type="submit" className={Styles.btn}>Add Book</button>
            </form>
        </div>
    );
};

export default AddBookPage;
