import React from "react";
import { useState } from 'react';
import Wrapper from "../UI/wrapper";

const Counter = () => {
    const [countState, setCountState] = useState(0);
    
    const upHandler = () => {
        setCountState(prev => prev + 1);
    }

    const downHandler = () => {
        if (countState >= 1) {
            setCountState(prev => prev - 1);
        }
    }

    return (
        <Wrapper>
            <h2>Counter</h2>
            <div>{countState}</div>
            <div>
                <button onClick={upHandler}>Up</button>
                <button onClick={downHandler}>Down</button>
            </div>
        </Wrapper>
    );
};

export default Counter;