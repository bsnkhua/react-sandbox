import React, { useRef, useState } from "react";

const ExpenseTrackerForm = (props) => {
    const nameRef = useRef(null);

    const amountRef = useRef(null);

    const dateRef = useRef(null);

    const [name, setName] = useState('');

    const [amount, setAmount] = useState(1);

    const getTodayString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    const [date, setDate] = useState(getTodayString);

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const amountHandler = (event) => {
        setAmount(Number(event.target.value));
    }

    const dateHandler = (event) => {
        setDate(event.target.value);
    }

    const addExpense = () => {

        if (name.trim() === '') {
            const textError = 'Field cant be empty';
            props.setTextError(textError);
            props.setRef(nameRef);
            return;
        }

        if (amount < 1) {
            const textError = 'Amount must be > 0';
            props.setTextError(textError);
            props.setRef(amountRef);
            return;
        }

        if (new Date(date) > new Date()) {
            const textError = 'The date cannot be later than today.';
            props.setTextError(textError);
            props.setRef(dateRef);
            return;
        }

        const newExpense = {
            name: name,
            amount: amount,
            date: date
        }

        props.onAddExpense(newExpense);
        setName('');
        setAmount(1);
        setDate(getTodayString);
    }

    return (
        <React.Fragment>
            <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input ref={nameRef} value={name} id="name" type="text" onChange={nameHandler}/>
            </div>
            <div className="form-row">
                <label htmlFor="amount">Amount:</label>
                <input ref={amountRef} value={amount} id="amount" type="number" onChange={amountHandler}/>
            </div>
            <div className="form-row">
                <label htmlFor="date">Date:</label>
                <input ref={dateRef} value={date} id="date" type="date" onChange={dateHandler}/>
            </div>
            <div className="form-row">
                <button onClick={addExpense}>Add expense</button>
            </div>
        </React.Fragment>
    );
};

export default ExpenseTrackerForm;