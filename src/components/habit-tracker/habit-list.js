import React from "react";
import styles from './habit-list.module.css'

const HabitList = (props) => {
    return (
        <React.Fragment>
            <h3>Habit list</h3>
            <ul className={styles.list}>
                {props.items.map((item, index) => (
                    <li key={index} className={item.done >= item.goal ? styles.done : ''}>
                        <div className={styles.info}>
                            <span className={styles.name}>{item.name}</span>
                            <div className={styles.counter}>
                                <div className={styles.inner}>
                                    {item.done} / {item.goal}
                                </div>
                                <button onClick={() => props.onIncrease(index)}>i +1</button>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <button onClick={() => props.onDeleteHabit(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default HabitList;