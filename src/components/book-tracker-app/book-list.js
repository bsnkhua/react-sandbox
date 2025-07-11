import React, { useState } from "react";
import styles from './book-list.module.css'

const BookList = (props) => {

    return (
        <React.Fragment>
            <h3>Book list</h3>
            <div className={styles['title-row']}>
                <div className={styles.title}>
                    <strong>Title</strong>
                </div>
                <div className={styles.author}>
                    <strong>Author</strong>
                </div>
                <div className={styles.pages}>
                    <strong>Pages</strong>
                </div>
            </div>
            <ul className={styles.list}>
                {props.items.map((item, index) => (
                    <li key={index} className={item.read ? `${styles.read}` : null}>
                        <div className={styles.title}>
                            {item.title}
                        </div>
                        <div className={styles.author}>
                            {item.author}
                        </div>
                        <div className={styles.pages}>
                            {item.pages}
                        </div>
                        <div className={styles.actions}>
                            <label htmlFor={index}>Read:</label>
                            <input id={index} type="checkbox" onClick={() => props.onClickRead(index)}/>
                            <button onClick={() => props.onDelete(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.total}>
                <span>Total books: <strong>{props.items.length}</strong></span>
            </div>
            <div className={styles.total}>
                <span>Read books: <strong>{props.total}</strong></span>
            </div>
        </React.Fragment>
    );
};

export default BookList;