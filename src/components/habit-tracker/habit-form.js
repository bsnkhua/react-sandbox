import React, { useRef, useState } from "react";
import styles from './habit-form.module.css'
import Modal from "../modal";

const HabitForm = (props) => {
    const [showModal, setShowmodal] = useState(false);

    const nameRef = useRef(null);

    const goalRef = useRef(null);

    const [hasErrorName, setHasErrorName] = useState(false);

    const [hasErrorGoal, setHasErrorGoal] = useState(false);

    const [name, setName] = useState('');

    const nameHandler = (event) => {
        setHasErrorName(false);
        setName(event.target.value);
    }

    const [goal, setGoal] = useState(1);

    const goalHandler = (event) => {
        setHasErrorGoal(false);
        setGoal(event.target.value);
    }

    const addHabitHandler = () => {

        if (name.trim() === '') {
            setHasErrorName(true);
            nameRef.current.focus();
            return;
        }

        if (goal < 1) {
            setHasErrorGoal(true);
            goalRef.current.focus();
            return;
        }

        if (props.items.some((item) => item.name === name)) {
            setShowmodal(true);
            return;
        }


        const newHabit = {
            name: name,
            goal: goal,
            done: 0,
            doneTask: false
        }

        props.onAddHabit(newHabit);

        setName('');
        setGoal(1);
        nameRef.current.focus();
    }

    const onCloseHandler = () => {
        setShowmodal(false);
        nameRef.current.focus();
    }

    return (
        <React.Fragment>
            {showModal && <Modal text={'This habit already exists.'} onCloseHandler={onCloseHandler}/>}
            <h3>Habit form</h3>
            <div className="form-row">
                <label htmlFor="name">Name habit:</label>
                <input ref={nameRef} value={name} id="name" type="text" onChange={nameHandler} className={hasErrorName ? `${styles.error}` : ''}/>
            </div>
            <div className="form-row">
                <label htmlFor="goal">Goal:</label>
                <input ref={goalRef} value={goal} id="goal" type="number" min={1} onChange={goalHandler} className={hasErrorGoal ? `${styles.error}` : ''} />
            </div>
            <button onClick={addHabitHandler}>Add habit</button>
        </React.Fragment>
    );
};

export default HabitForm;