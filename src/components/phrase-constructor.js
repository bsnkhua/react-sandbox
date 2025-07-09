import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './phrase-constructor.module.css'

const PhraseConstructor = () => {
    const array01 = ['Жизнь — это', 'Успех приходит к тому, кто', 'Настоящая сила в том, что'];

    const array02 = ['умеет ждать', 'не боится ошибок', 'движется вперёд'];

    const array03 = ['в любых условиях.', 'даже когда сложно.', 'каждый день.'];

    const [finalPhrase, setFinalPhrase] = useState('');

    const createPhraseHandler = () => {
        setFinalPhrase(array01[Math.floor((Math.random() * array01.length))] + ' ' + array02[Math.floor((Math.random() * array02.length))] + ' ' + array03[Math.floor((Math.random() * array03.length))]);
    }

    return (
        <Wrapper>
            <h2>Phrase Constructor</h2>
            <button onClick={createPhraseHandler}>Create phrase</button>
            {finalPhrase && 
            <div className={styles.holder}>
                {finalPhrase}
            </div>}
        </Wrapper>
    );
};

export default PhraseConstructor;