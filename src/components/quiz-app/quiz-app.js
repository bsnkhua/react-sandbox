import { useEffect, useState } from "react";
import Wrapper from "../../UI/wrapper";
import styles from './quiz-app.module.css';
import Modal from "../modal";

const QuizApp = () => {
    const questions = [
        {
            question: 'What is the capital of Italy?',
            answers: ['Madrid', 'Rome', 'Paris', 'Berlin'],
            correct: 'Rome'
        },
        {
            question: 'Which language is primarily spoken in Brazil?',
            answers: ['Spanish', 'Portuguese', 'English', 'French'],
            correct: 'Portuguese'
        },
        {
            question: 'How many continents are there?',
            answers: ['5', '6', '7', '8'],
            correct: '7'
        },
        {
            question: 'What is H2O commonly known as?',
            answers: ['Hydrogen', 'Salt', 'Water', 'Oxygen'],
            correct: 'Water'
        },
        {
            question: 'Which planet is closest to the sun?',
            answers: ['Venus', 'Earth', 'Mercury', 'Mars'],
            correct: 'Mercury'
        }
    ];

    const [showQuiz, setShowQuiz] = useState(() => {
        const stored = localStorage.getItem('storedShowQuiz');
        return stored !== null ? JSON.parse(stored) : false;
    });

    const [quizList, setQuizList] = useState(questions);

    const [currentIndex, setCurrentIndex] = useState(() => {
        const stored = localStorage.getItem('storedCurrentIndex');
        return stored !== null ? JSON.parse(stored) : 0;
    });

    const [selectedIndex, setSelectedIndex] = useState(null);

    const [isCorrect, setIsCorrect] = useState(null);

    const [disabledState, setDisabledState] = useState(false);

    const [correctIndex, setCorrectIndex] = useState(null);

    const [nextBtn, setNextBtn] = useState(false);

    const [totalCorrect, setTotalCorrect] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [progress, setProgress] = useState(() => {
        const stored = localStorage.getItem('storedProgress');
        return stored !== null ? JSON.parse(stored) : 0;
    });

    const startHandler = () => {
        setShowQuiz(true);
        setCurrentIndex(0);
        setProgress(((currentIndex + 1) / quizList.length) * 100);
    }

    const checkResult = (index) => {
        setSelectedIndex(index);
        const selectedAnswer = quizList[currentIndex].answers[index];
        const correctAnswer = quizList[currentIndex].correct;
        setDisabledState(true);

        if (selectedAnswer === correctAnswer) {
            setIsCorrect(true);
            setTotalCorrect((prev) => prev + 1);
        } else {
            setIsCorrect(false);
        }

        const filtered = quizList[currentIndex].answers.map((answer, i) => answer.includes(correctAnswer) ? i : null).filter(i => i !== null);

        const constUpFil = filtered;

        setCorrectIndex(constUpFil);   
        setNextBtn(true);
    }

    const resetHandler = () => {
        setShowQuiz(false);
        setCurrentIndex(0);
        setCorrectIndex(null);
        setDisabledState(false);
        setIsCorrect(null);
        setShowModal(false);
        setTotalCorrect(0);
    }

    const nextHandler = () => {
        const curtIndex = currentIndex + 1;

        if (curtIndex >= quizList.length) {
            setShowModal(true);
            return;
        }

        setCurrentIndex(curtIndex);
        setNextBtn(false);
        setCorrectIndex(null);
        setDisabledState(false);
        setIsCorrect(null);
        setProgress(((curtIndex + 1) / quizList.length) * 100);
    }

    const onCloseHandler = () => {
        setShowModal(false);
        resetHandler();
    }

    useEffect(() => {
        localStorage.setItem('storedShowQuiz', JSON.stringify(showQuiz));
    }, [showQuiz]);

    useEffect(() => {
        localStorage.setItem('storedCurrentIndex', JSON.stringify(currentIndex));
    }, [currentIndex]);

    useEffect(() => {
        localStorage.setItem('storedProgress', JSON.stringify(progress));
    }, [progress]);

    return (
        <Wrapper>
            {showModal &&
                <Modal text={`Correct answers: ${totalCorrect}`} onCloseHandler={onCloseHandler}>
                    <button onClick={resetHandler} className={styles['start-button']}>Start over</button>
                </Modal>
            }
            <h2>Quiz App</h2>
            {showQuiz !== true ? <button onClick={startHandler}>Start</button> : null}
            {showQuiz && <button onClick={resetHandler}>Reset</button>}
            {showQuiz &&
                <div className={styles['quiz-holder']}>
                    <div className={styles.question}>
                        <h3>{quizList[currentIndex].question}</h3>
                    </div>
                    <div className={styles.answers}>
                        <ul className={styles.list}>
                            {quizList[currentIndex].answers.map((item, index) => {
                                let btnClass = '';

                                if (selectedIndex === index) {
                                    if (isCorrect === true) {
                                        btnClass = `${styles.correct} ${styles.selected}`;
                                    } else if (isCorrect === false) {
                                        btnClass = `${styles.error} ${styles.selected}`;
                                    }
                                }

                                if (correctIndex && correctIndex.includes(index)) {
                                    btnClass = `${styles.correct}`;
                                }

                                if (correctIndex && correctIndex.includes(index) && selectedIndex === index) {
                                    btnClass = `${styles.selected}`;
                                }

                                return (
                                    <li key={index}>
                                        <button 
                                            disabled={disabledState}
                                            id={index} 
                                            value={item} 
                                            className={btnClass}
                                            onClick={() => checkResult(index)}>{item}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className={styles['progress-bar-holder']}>
                        <div style={{width: `${progress}%`}}></div>
                    </div>
                    <div className={styles['next-btn-holder']}>
                        {nextBtn && <button onClick={nextHandler}>Next question</button>}
                    </div>
                </div>
            }
        </Wrapper>
    );
};

export default QuizApp;