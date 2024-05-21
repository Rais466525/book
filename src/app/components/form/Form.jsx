'use client';

import React, { useState } from 'react';
import Styles from './Form.module.css';

const PostForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bookTitle: '',
        pageCount: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={Styles.form}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className={Styles.input}
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={Styles.input}
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                className={Styles.input}
                value={formData.phone}
                onChange={handleChange}
            />
            <input
                type="text"
                name="bookTitle"
                placeholder="Book Title"
                required
                className={Styles.input}
                value={formData.bookTitle}
                onChange={handleChange}
            />
            <input
                type="number"
                name="pageCount"
                placeholder="Page Count"
                required
                className={Styles.input}
                value={formData.pageCount}
                onChange={handleChange}
            />
            <input
                name="description"
                placeholder="Description"
                required
                className={Styles.input}
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit" className={Styles.btn}>Create</button>
        </form>
    );
};

export default PostForm;
