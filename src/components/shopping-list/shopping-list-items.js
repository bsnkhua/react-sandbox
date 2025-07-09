import React, { useState } from "react";
import styles from './shopping-list-items.module.css'

const ShoppingListItems = (props) => {

    return (
        <React.Fragment>
            <h3>Shopping List</h3>
            <ul className={styles.list}>
                {props.items.map((item, index) => (
                    <li key={index} className={item.bought ? `${styles.bought}` : ''}>
                        <span>{item.name}</span>
                        <div>
                            {item.amount}
                            <input type="checkbox" onChange={() => props.onBought(index)}/>
                        </div>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default ShoppingListItems;