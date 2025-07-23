import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal";

const ImageForm = (props) => {
    const [currentRef, setCurrentRef] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    const nameInputRef = useRef(null);

    const [name, setName] = useState('');

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(null);

    const [image, setImage] = useState(null);

    const imageHandler = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const addImage = () => {
        if (name.trim() === '') {
            setShowModal(true);
            setErrorMessage('Name cant be empty!');
            setCurrentRef(nameInputRef);
            return;
        }

        if (!image) {
            setShowModal(true);
            setErrorMessage('Choose a file!');
            setCurrentRef(fileInputRef);
            return;
        }

        const newImage = {
            name: name,
            image: preview
        }

        props.addHandler(newImage);

        setName('');
        setImage(null);
        setPreview(null);
        fileInputRef.current.value = '';
    }

    const [showModal, setShowModal] = useState(false);

    const onCloseHandler = () => {
        setShowModal(false);
        currentRef.current.focus();
    }

    return (
        <React.Fragment>
            {showModal && <Modal text={errorMessage} onCloseHandler={onCloseHandler}/>}
            <h3>Image form</h3>
            <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input value={name} id="name" ref={nameInputRef} type="text" onChange={nameHandler}/>
            </div>
            <div className="form-row">
                <label htmlFor="file">File:</label>
                <input id="file" type="file" ref={fileInputRef} onChange={imageHandler}/>
            </div>
            <div className="form-row">
                <button onClick={addImage}>Add image</button>
            </div>
        </React.Fragment>
    );
};

export default ImageForm;