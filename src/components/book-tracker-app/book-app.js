import React, { useEffect, useState } from "react";
import styles from './book-app.module.css'

import Wrapper from "../../UI/wrapper";
import BookForm from "./book-form";
import BookList from "./book-list";
import Modal from "../modal";

const BookApp = () => {
    const [curentIndex, setCurentIndex] = useState(null);

    const [newTitle, setNewTitle] = useState('');

    const [newAuthor, setNewAuthor] = useState('');

    const [newPages, setNewPages] = useState('');

    const [newRead, setNewRead] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const storedBooks = localStorage.getItem('storedBooks');

        if (storedBooks) {
            setBookList(JSON.parse(storedBooks));
        }
    }, []);

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

    useEffect(() => {
        if (bookList.length > 0) {
            localStorage.setItem('storedBooks', JSON.stringify(bookList));
        }
    }, [bookList]);

    const onCloseEditHandler = () => {
        setShowEditModal(false);
    }

    const newTitleHandler = (event) => {
        setNewTitle(event.target.value);
    }

    const newAuthorHandler = (event) => {
        setNewAuthor(event.target.value);
    }

    const newPagesHandler = (event) => {
        setNewPages(event.target.value);
    }

    const onEdit = (index) => {
        setNewTitle(bookList[index].title);
        setNewAuthor(bookList[index].author);
        setNewPages(bookList[index].pages);
        setNewRead(bookList[index].read);
        setCurentIndex(index);
        setShowEditModal(true);
    }

    const saveChangesHandler = () => {
        const newBook = {
            title: newTitle,
            author: newAuthor,
            pages: newPages,
            read: newRead
        }

        const upBooklist = bookList.map((book, index) => 
            index ===  curentIndex ? newBook : book
        )

        setBookList(upBooklist);
        setShowEditModal(false);
    }

    return (
        <Wrapper>
            <h2>Book tracker app</h2>
            <div className="holder">
                <div className="box">
                    <BookForm onAddBook={addBookHandler} setShowModal={setShowModal} setTextError={setTextError} setInputRef={setInputRef} items={bookList}/>
                </div>
                <div className="box">
                    <BookList items={visibleBooks} onDelete={deleteHandler} onClickRead={readHandler} total={totalRead} onEdit={onEdit}/>

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
            {showEditModal && 
                <Modal text={'Edit book'} onCloseHandler={onCloseEditHandler}>
                    <div className={styles['edit-box']}>
                        <div className="form-row">
                            <label htmlFor="newTitle">Edit title:</label>
                            <input value={newTitle} id="newTitle" type="text" onChange={newTitleHandler}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="newAuthor">Edit author:</label>
                            <input value={newAuthor} id="newAuthor" type="text" onChange={newAuthorHandler}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="newPages">Edit pages:</label>
                            <input value={newPages} id="newPages" type="number" min={1} onChange={newPagesHandler}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="newPages">Edit read:</label>
                            <input type="checkbox" checked={newRead} onChange={(event) => setNewRead(event.target.checked)} />
                        </div>
                        <div className={styles['button-holder']}>
                            <button onClick={saveChangesHandler}>Save</button>
                        </div>
                    </div>
                </Modal>
            }
        </Wrapper>
    );
};

export default BookApp;