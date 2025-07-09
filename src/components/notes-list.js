import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './notes-list.module.css'

const NotesList = () => {
    
    const [notes, setNotes] = useState([]);

    const [text, setText] = useState('');

    const onChangeHandler = (event) => {
        setText(event.target.value);
    };

    const onAddHandler = () => {
        if (text != '') {
            setNotes([...notes, text]);
            setText('');
        }
    }

    const deleteHandler = (index) => {
        setNotes(notes.filter((note, i) => i !== index));
    }
    
    return (
        <Wrapper>
            <h2>Notes List</h2>
            <div className={styles.row}>
                <input id="text" value={text} type="text" onChange={onChangeHandler}/>
                <button onClick={onAddHandler}>Add note</button>
            </div>
            <ul className={styles.list}>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note}
                        <button onClick={() => deleteHandler(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </Wrapper>
    );
};

export default NotesList;