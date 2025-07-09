import { useState } from "react";
import Wrapper from "../UI/wrapper";
import styles from './theme-switch.module.css'

const ThemeSwitch = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const themeChangeHandler = () => {
        setDarkTheme(prev => !prev);
    }

    return (
        <Wrapper>
            <h2>Theme Switch</h2>
            <div className={darkTheme ? `${styles.box} ${styles.dark}` : `${styles.box} ${styles.light}`}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae labore distinctio necessitatibus? Necessitatibus, quis suscipit nobis, ea eius eligendi magnam tenetur, ducimus aspernatur iste eaque sit ab commodi tempore odit!</p>
                <button onClick={themeChangeHandler}>Change theme to {darkTheme ? 'light' : 'dark'}</button>
            </div>
        </Wrapper>
    );
} 

export default ThemeSwitch;