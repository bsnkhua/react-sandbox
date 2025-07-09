import React, { useState } from "react";
import styles from './shopping-form.module.css'

const ShoppingForm = (props) => {

    const [name, setName] = useState('');

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const [amount, setAmount] = useState(1);

    const amountHandler = (event) => {
        setAmount(event.target.value);
    }

    const addProduct = () => {
        const newProduct = {
            name: name,
            amount: amount,
            bought: false
        };

        props.onAddProduct(newProduct);
    }

    return (
        <React.Fragment>
            <h3>Shopping form</h3>
            <div className={styles.row}>
                <label htmlFor="name">Product name:</label>
                <input value={name} id="name" type="text" onChange={nameHandler}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="amount">Amount:</label>
                <input value={amount} id="amount" type="number" min={1} onChange={amountHandler}/>
            </div>
            <button onClick={addProduct}>Add product</button>
        </React.Fragment>
    );
};

export default ShoppingForm;