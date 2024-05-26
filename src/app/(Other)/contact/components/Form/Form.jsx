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

            // Очистка формы после успешной отправки
            setFormData({
                name: '',
                email: '',
                phone: '',
                bookTitle: '',
                pageCount: '',
                description: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={Styles.form}>
            <input
                type="text"
                name="name"
                placeholder="Имя"
                required
                className={Styles.input}
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Эл. Почта"
                required
                className={Styles.input}
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Номер телефона"
                required
                className={Styles.input}
                value={formData.phone}
                onChange={handleChange}
            />
            <input
                type="text"
                name="bookTitle"
                placeholder="Название книги"
                required
                className={Styles.input}
                value={formData.bookTitle}
                onChange={handleChange}
            />
            <input
                type="number"
                name="pageCount"
                placeholder="Количество страниц"
                required
                className={Styles.input}
                value={formData.pageCount}
                onChange={handleChange}
            />
            <input
                name="description"
                placeholder="Описание"
                required
                className={Styles.input}
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit" className={Styles.btn}>Отправить</button>
        </form>
    );
};

export default PostForm;