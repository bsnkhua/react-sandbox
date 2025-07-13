import { useEffect, useState } from "react";
import Wrapper from "../../UI/wrapper";

const NoteSaverApp = () => {
    const [savedText, setSavedText] = useState('');
    const [input, setInput] = useState('');

    const onChangeHandler = (event) => {
        setInput(event.target.value);
    }

    useEffect(() => {
        const localtext = localStorage.getItem('noteSaverText');
        if (localtext) {
            setInput(localtext);
        }
    }, []);

    const addText = () => {
        localStorage.setItem('noteSaverText', input);
        setSavedText(input);
    }

    return (
        <Wrapper>
            <h2>Note saver</h2>
            <div className="form-row">
                <label htmlFor="input">Input text:</label>
                <input value={input} id="input" type="text" onChange={onChangeHandler}/>
            </div>
            <div className="form-row">
                <button onClick={addText}>Save</button>
            </div>
            <div className="form-row">
                Saved text: {savedText}
            </div>
        </Wrapper>
    );
};

export default NoteSaverApp;