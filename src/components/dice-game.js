import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './dice-game.module.css'
import Modal from "./modal";

const DiceGame = () => {
    const [arrayHistory, setArrayHistory] = useState([]);

    const [diceValue, setDiceValue] = useState(0);
    
    const [totalValue, setTotalValue] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const onClickHandler = () => {
        const updatedDiceValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(updatedDiceValue);

        setTotalValue(prev => {
            const newTotal = prev + updatedDiceValue;

            if (newTotal > 30) {
                setShowModal(true);
                setDiceValue(0);
                setArrayHistory([]);
                return 0;
            }

            return newTotal;
        });

        setArrayHistory([...arrayHistory, updatedDiceValue]);
    }

    const onCloseHandler = () => {
        setShowModal(false);
    }

    const resetCounterHandler =() => {
        setDiceValue(0);
        setTotalValue(0);
        setArrayHistory([]);
    }

    return (
        <Wrapper>
            <h2>Dice Game</h2>
            <button onClick={onClickHandler}>Бросить кость!</button>
            <div className={styles.results}>Выпало: {diceValue !==0 ? diceValue : null}
            </div>
            <div className={styles.results}>
                История: {arrayHistory.join(' - ')}
            </div>
            <div className={styles.results}>Total: {totalValue}</div>
            {showModal && <Modal text={'Вы набрали 30 очков и выиграли!'} onCloseHandler={onCloseHandler}/>}
            <button onClick={resetCounterHandler}>Сбросить счет</button>
        </Wrapper>
    );
};

export default DiceGame;