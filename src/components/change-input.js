import React from "react";
import { useState } from 'react';
import Wrapper from "../UI/wrapper";

const ChangeInput = () => {
    const [inputText, setInputText] = useState('');

    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    return (
        <Wrapper>
            <h2>Change input</h2>
            <input type="text" value={inputText} onChange={inputTextHandler}/>
            <p>Привет, <b>{inputText}</b></p>
        </Wrapper>
    );
};

export default ChangeInput;