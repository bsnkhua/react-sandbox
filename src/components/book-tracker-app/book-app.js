import React, { useState } from "react";
import styles from './book-app.module.css'

import Wrapper from "../../UI/wrapper";
import BookForm from "./book-form";
import BookList from "./book-list";
import Modal from "../modal";

const BookApp = () => {
    const [onlyReadFilter, setOnlyReadFilter] = useState(false);

    const [filterText, setFilterText] = useState('');

    const [inputRef, setInputRef] = useState(null);

    const [textError, setTextError] = useState('');

    const [showModal, setShowModal] = useState(false);
    
    const [bookList, setBookList] = useState([]);

    const totalRead = bookList.filter(item => item.read).length;

    const filterTextHandler = (event) => {
        setFilterText(event.target.value);
    }

    const addBookHandler = (newBook) => {
        setBookList((prevList) => [...prevList, newBook]);
    }

    const deleteHandler = (index) => {
        const updatedBookList = bookList.filter((item, i) => i != index);

        setBookList(updatedBookList);
    }

    const readHandler = (title, author) => {
        const upBookList = bookList.map((book) =>
            book.title === title && book.author === author
            ? { ...book, read: !book.read }
            : book
        );
        
        setBookList(upBookList);
    };

    const onCloseHandler = () => {
        setShowModal(false);
        inputRef.current.focus();
    }

    const onlyreadFilterHandler = () => {
        setOnlyReadFilter((prev) => !prev);
    }

    const visibleBooks = bookList.filter((book) => {
        const matchesText = book.author.toLowerCase().includes(filterText.toLowerCase());
        const matchesRead = onlyReadFilter ? book.read : true;
        return matchesText && matchesRead;
    });

    return (
        <Wrapper>
            <h2>Book tracker app</h2>
            <div className="holder">
                <div className="box">
                    <BookForm onAddBook={addBookHandler} setShowModal={setShowModal} setTextError={setTextError} setInputRef={setInputRef} items={bookList}/>
                </div>
                <div className="box">
                    <BookList items={visibleBooks} onDelete={deleteHandler} onClickRead={readHandler} total={totalRead}/>

                    <div className={styles.filter}>
                        <div>
                            <div>
                                <label htmlFor="filtertext">Filter by author:</label>
                                <input value={filterText} id="filtertext" type="text" onChange={filterTextHandler}/>
                            </div>
                            <div>
                                <label htmlFor="onlyread">Only read</label>
                                <input checked={onlyReadFilter} id="onlyread" type="checkbox" onChange={onlyreadFilterHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && 
                <Modal text={textError} onCloseHandler={onCloseHandler}></Modal>
            }
        </Wrapper>
    );
};

export default BookApp;