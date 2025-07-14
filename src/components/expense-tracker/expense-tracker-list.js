import React from "react";
import styles from './expense-tracker-list.module.css'

const ExpenseList = (props) => {
    return (
        <React.Fragment>
            <ul className={styles.list}>
                {props.items.map((item, index) => (
                    <li key={index}>
                        <div className={styles['description-holder']}>
                            <div className={styles.description}>
                                <span>{item.name}</span>
                                <span>{item.amount} $</span>
                            </div>
                            <div className={styles.date}>
                                <span>{item.date}</span>
                            </div>
                        </div>
                        <div className={styles['button-holder']}>
                            <button onClick={() => props.onEditHandler(index)}>Edit</button>
                            <button onClick={() => props.onDelete(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.total}>
                <strong>Total: {props.total} $</strong>
            </div>
        </React.Fragment>
    );
};

export default ExpenseList;