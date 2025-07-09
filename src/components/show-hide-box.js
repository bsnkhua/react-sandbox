import React from "react";
import { useState } from 'react';
import Wrapper from "../UI/wrapper";

const ShowHideBox = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleContent = () => {
        setIsVisible(prev => !prev);
    }

    return (
        <Wrapper>
            <h2>Show/hide box</h2>
            <button onClick={toggleContent}>
                {isVisible ? 'Скрыть' : 'Показать'}
            </button>
            {isVisible && (<p>Привет, React!</p>)}
        </Wrapper>
    );
};

export default ShowHideBox;