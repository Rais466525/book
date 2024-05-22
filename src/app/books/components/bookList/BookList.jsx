'use client';

import { useEffect, useState } from 'react'
import Styles from './BookList.module.css'

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={Styles.bookList}>
            {books.map(book => (
                <div key={book._id} className={Styles.bookItem}>
                    <img src={book.coverImageUrl} alt={book.title} className={Styles.coverImage} />
                    <div className={Styles.text}>
                        <h3>{book.title}</h3>
                        <p><strong>Автор:</strong> {book.author}</p>
                        <p>{book.description}</p>
                        <p><strong>Цена:</strong> ${book.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;
