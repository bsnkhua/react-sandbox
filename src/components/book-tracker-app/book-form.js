import React, { useRef, useState } from "react";

const BookForm = (props) => {
    const titleRef = useRef(null);

    const authorRef = useRef(null);

    const pagesRef = useRef(null);
    
    const [title, setTitle] = useState('');

    const [author, setAuthor] = useState('');

    const [pages, setPages] = useState(1);

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const authorHandler = (event) => {
        setAuthor(event.target.value);
    }

    const pagesHandler = (event) => {
        setPages(event.target.value);
    }

    const addBookHandler = () => {

        if (title.trim() === '') {
            props.setTextError('Field cant be empty');
            props.setShowModal(true);
            props.setInputRef(titleRef);
            return;
        }

        if (author.trim() === '') {
            props.setTextError('Field cant be empty');
            props.setShowModal(true);
            props.setInputRef(authorRef);
            return;
        }

        if (pages < 1) {
            props.setTextError('Page cant be < 1');
            props.setShowModal(true);
            props.setInputRef(pagesRef);
            setPages(1);
            return;
        }

        if (props.items.some((item, i) => item.title === title && item.author === author)) {
            props.setTextError('This book has already been added');
            props.setShowModal(true);
            props.setInputRef(titleRef);
            return;
        }

        const newBook = {
            title: title,
            author: author,
            pages: pages,
            read: false
        }

        props.onAddBook(newBook);

        setTitle('');
        setAuthor('');
        setPages(1);
    }

    return (
        <React.Fragment>
            <h3>Book form</h3>
            <div className="form-row">
                <label htmlFor="title">Title:</label>
                <input ref={titleRef} value={title} id="title" type="text" onChange={titleHandler}/>
            </div>
            <div className="form-row">
                <label htmlFor="author">Author:</label>
                <input ref={authorRef} value={author} id="author" type="text" onChange={authorHandler}/>
            </div>
            <div className="form-row">
                <label htmlFor="pages">Pages:</label>
                <input ref={pagesRef} value={pages} id="pages" type="number" min={1} onChange={pagesHandler}/>
            </div>
            <button onClick={addBookHandler}>Add</button>
        </React.Fragment>
    );
};

export default BookForm;