import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './random-quote.module.css'

const RandomQuote = () => {
    const [quote, setQuote] = useState([
        'Qoute 01 Lorem ipsum dolor sit amet consectetur, adipisicing elit. perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obcaecati',
        'Qoute 02 Lorem ipsum dolor perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obcaecati, perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obcaecati',
        'Qoute 03 Lorem ipsum dolor sit amet consectetur, perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obcaecati',
        'Qoute 04 Perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obcaecati, sit amet consectetur, adipisicing elit.',
        'Qoute 05 Lorem perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obcaecati',
        'Qoute 06 perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obc perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obc perspiciatis debitis reiciendis. Ipsa libero sint mollitia nam obc',
    ]);

    const [updatedQuote, setUpdatedQuote] = useState('');

    const showRandomHandler = () => {
        const randomQuote = quote[Math.floor(Math.random() * quote.length)];

        if (randomQuote != updatedQuote) {
            setUpdatedQuote(randomQuote);
            setShowQuoteBox(true);
        } else {
            const randomQuote = quote[Math.floor(Math.random() * quote.length)];
            setUpdatedQuote(randomQuote);
            setShowQuoteBox(true);
        }
    }

    const [showQuoteBox, setShowQuoteBox] = useState(false);

    const hideQuoteHandler = () => {
        setShowQuoteBox(false);
    }

    return (
        <Wrapper>
            <h2>Random Quote</h2>
            <button onClick={showRandomHandler}>Show random quote</button>
            {showQuoteBox && 
            <div className={styles.quote}>
                {updatedQuote}
                <div>
                    <button onClick={hideQuoteHandler}>Hide quote</button>
                </div>
            </div>}
        </Wrapper>
    );
};

export default RandomQuote;