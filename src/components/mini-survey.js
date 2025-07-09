import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './mini-survey.module.css'
import Modal from "./modal";

const MiniSurvey = () => {
    const arrayLanguage = ['JavaScript', 'Python', 'C++', 'Java'];

    const [counterArray, setCounterArray] = useState(arrayLanguage.map((_, i) => 0));

    const [showModal, setShowModal] = useState(false);

    const onClickHandler = (index) => {
        const updatedCounterArray = [...counterArray];
        updatedCounterArray[index] = Number(counterArray[index]) + 1;
        setCounterArray(updatedCounterArray);
        setShowModal(true);
    }

    const onCloseHandler = () => {
        setShowModal(false);
    };

    return (
        <Wrapper>
            {showModal && <Modal text={'Спасибо за голос!'} onCloseHandler={onCloseHandler}/>}
            <h2>Mini Survey</h2>
            <h3>Какой язык программирования тебе нравится больше всего?</h3>
            <div className={styles['button-holder']}>
                <ul>
                    {arrayLanguage.map((item, index) => (
                        <li key={index}>
                            <button onClick={() => onClickHandler(index)}>{item}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.results}>
                <strong>Results</strong>
                <ul>
                    {arrayLanguage.map((item, index) => (
                        <li key={index}>
                            {item}:
                            {counterArray[index]}
                        </li>
                    ))}
                </ul>
            </div>
        </Wrapper>
    );
};

export default MiniSurvey;