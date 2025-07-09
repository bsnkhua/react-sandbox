import { useRef, useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './unique-numbers-tracker.module.css'
import Modal from "./modal";

const UniqueNumbersTracker = () => {
    const [array, setArray] = useState([]);

    const [inputText, setInputText] = useState('');

    const [total, setTotal] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const inputRef = useRef(null);

    const [errorText, setErrorText] = useState('');

    const changeNumberHandler = (event) => {
        setInputText(event.target.value);
    }

    const addNumberHandler = () => {
        if (array.length < 10) {
            if (array.includes(Number(inputText))) {
                setInputText('');
                setErrorText('Число повторяется');
                setShowModal(true);
                inputRef.current.focus()
            } else {
                if (Number(inputText) < 1) {
                    setErrorText('Число меньше 0');
                    setShowModal(true);
                    setInputText('');
                    inputRef.current.focus()
                } else {
                    const updatedArray = [...array, Number(inputText)]
                    setArray(updatedArray);
                    setInputText('');
                    setTotal(updatedArray.reduce((acc, curr) => acc + Number(curr), 0));
                    inputRef.current.focus()
                }
            }
        } else {
            setErrorText('Массив слишком большой (больше 10 эл.)');
            setShowModal(true);
            setArray([]);
            setTotal(0);
            setInputText('');
            inputRef.current.focus()
        }
    }

    const resetHandler = () => {
        setArray([]);
        setTotal(0);
        setInputText('');
        inputRef.current.focus()
    }

    const onCloseHandler = () => {
        setShowModal(false);
        inputRef.current.focus()
    }

    return (
        <Wrapper>
            {showModal && <Modal onCloseHandler={onCloseHandler} text={errorText}/>}
            <h2>Unique Numbers Tracker</h2>
            <div className={styles['add-row']}>
                <input ref={inputRef} value={inputText} type="number" onChange={changeNumberHandler}/>
                <button onClick={addNumberHandler}>Add</button>
            </div>
            {array.length != 0 && <div className={styles.total}><div>{array.join(' + ')}</div> = <div>{total}</div></div>}
            <button onClick={resetHandler}>Reset</button>
        </Wrapper>
    );
};

export default UniqueNumbersTracker;