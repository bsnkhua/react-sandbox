import { use, useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './dice-game-multiplayer.module.css'
import Modal from "./modal";

const DiceGameMultiplayer = () => {
    const [currentPlayer, setCurrentPlayer] = useState(true);

    const [totalDice01, setTotalDice01] = useState(0);

    const [totalDice02, setTotalDice02] = useState(0);

    const [historyArray01, setHistoryArray01] = useState([]);

    const [historyArray02, setHistoryArray02] = useState([]);

    const onClickHandler = () => {

        if (currentPlayer === true) {
            const updatedDiceValue01 = Math.floor(Math.random() * 6) + 1;

            const updatedTotalValue01 = (updatedDiceValue01 + totalDice01);
            setTotalDice01(updatedTotalValue01);

            setHistoryArray01([...historyArray01, updatedDiceValue01]);

            if (updatedTotalValue01 > 30) {
                setShowModal(true);
                setTotalDice01(0);
                setTotalDice02(0);
                setHistoryArray01([]);
                setHistoryArray02([]);
            }
        }

        else {
            const updatedDiceValue02 = Math.floor(Math.random() * 6) + 1;

            const updatedTotalValue02 = (updatedDiceValue02 + totalDice02);
            setTotalDice02(updatedTotalValue02);

            setHistoryArray02([...historyArray02, updatedDiceValue02]);

            if (updatedTotalValue02 > 30) {
                setShowModal(true);
                setTotalDice01(0);
                setTotalDice02(0);
                setHistoryArray01([]);
                setHistoryArray02([]);
            }
        }

        setCurrentPlayer(prev => !prev);
    };

    const resetHandler = () => {
        setCurrentPlayer(true);
        setTotalDice01(0);
        setTotalDice02(0);
        setHistoryArray01([]);
        setHistoryArray02([]);
    }

    const [showModal, setShowModal] = useState(false);

    const onCloseHandler = () => {
        setShowModal(false);
        setCurrentPlayer(true);
    }

    return (
        <Wrapper>
            {showModal && <Modal onCloseHandler={onCloseHandler} text={currentPlayer === false ? `${'Win player 01'}` : `${'Win player 02'}`}/>}
            <h2>Dice Game Multiplayer</h2>
            <div className='holder'>
                <div className={currentPlayer === false ? `box ${styles.disabled}` : `box`}>
                    <h3>Player 1</h3>
                    <div className={styles.row}>
                        История бросков: {historyArray01.join(' - ')}
                    </div>
                    <div>
                        Total: {totalDice01}
                    </div>
                </div>
                <div className={currentPlayer === true ? `box ${styles.disabled}` : 'box'}>
                    <h3>Player 2</h3>
                    <div className={styles.row}>
                        История бросков: {historyArray02.join(' - ')}
                    </div>
                    <div>
                        Total: {totalDice02}
                    </div>
                </div>
            </div>
            <div className={styles.title}>
                <h4>Ходит Игрок - {currentPlayer === true ? `${'1'}` : `${'2'}`}</h4>
            </div>
            <div className={styles['button-holder']}>
                <div>
                    <button onClick={onClickHandler}>Бросить кость!</button>
                </div>
                <div>
                    <button onClick={resetHandler}>Reset!</button>
                </div>
            </div>
        </Wrapper>
    );
};

export default DiceGameMultiplayer;