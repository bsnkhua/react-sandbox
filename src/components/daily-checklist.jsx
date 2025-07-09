import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './daily-checklist.module.css'

const DailyChecklist = () => {

    const [dailyList, setDailyList] = useState([]);

    const addDailyHandler = () => {
        if (inputText != '') {
            setDailyList([...dailyList, {
                name: inputText,
                done: false
            }]);
            setInputText('');
        }
    }

    const [inputText, setInputText] = useState('');

    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    const deleteDailyHandler = (index) => {
        setDailyList(dailyList.filter((item, i) => i != index));
    }

    const doneDailyHandler = (index) => {
        const updatedDailyList = [...dailyList];

        updatedDailyList[index] = {
            ...updatedDailyList[index],
            done: !updatedDailyList[index].done
        }

        setDailyList(updatedDailyList);
    }

    return (
        <Wrapper>
            <h2>Daily Checklist</h2>
            <div className={styles.row}>
                <input value={inputText} type="text" onChange={inputTextHandler}/>
                <button onClick={addDailyHandler}>Add item</button>
            </div>
            <div className={styles.stat}>
                Total tasks: <b>{dailyList.length}</b>
            </div>
            <div className={styles.stat}>
                Done tasks: <b>{dailyList.filter(item => item.done).length}</b>
            </div>
            {dailyList.length != 0 && 
            <ul className={styles.list}>
                {dailyList.map((item, index) => (
                    <li key={index} className={item.done ? `${styles.done}` : ''}>
                        <div className={styles.name}>
                            {item.name}
                        </div>
                        <div className={styles['sub-row']}>
                            <label htmlFor={index}>Done</label>
                            <input id={index} type="checkbox" onChange={() => doneDailyHandler(index)} checked={item.done}/>
                            <button onClick={() => deleteDailyHandler(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>}
        </Wrapper>
    );
};

export default DailyChecklist;