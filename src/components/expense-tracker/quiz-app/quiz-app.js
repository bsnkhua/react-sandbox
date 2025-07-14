import { useState } from "react";
import Wrapper from "../../../UI/wrapper";
import styles from './quiz-app.module.css'

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

    const [showQuiz, setShowQuiz] = useState(false);

    const [quizList, setQuizList] = useState(questions);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const startHandler = () => {
        setShowQuiz(true);
        setCurrentIndex(0);
    }

    const checkResult = (index) => {
        const btnValue = document.getElementById('id-' + index).value;

        if (btnValue === quizList[currentIndex].correct) {
            console.log('true');
            setSelectedIndex(index);
        } else {
            console.log('false');
        }
    }

    return (
        <Wrapper>
            <h2>Quiz App</h2>
            <button onClick={startHandler}>Start</button>
            {showQuiz &&
                <div className={styles['quiz-holder']}>
                    <div className={styles.question}>
                        <h3>{quizList[currentIndex].question}</h3>
                    </div>
                    <div className={styles.answers}>
                        <ul className={styles.list}>
                            {quizList[currentIndex].answers.map((item, index) => (
                                <li key={index}>
                                    <button 
                                        id={`id-${index}`} 
                                        className={selectedIndex === index ? `${styles.correct}` : `${styles.error}`} 
                                        value={item} 
                                        onClick={() => checkResult(index)}>{item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </Wrapper>
    );
};

export default QuizApp;