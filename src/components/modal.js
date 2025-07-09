import { useState } from 'react';
import styles from './modal.module.css'

const Modal = (props) => {

    return (
        <div className={`${props.className} ${styles.modal}`}>
            <div className={styles.backdrop} onClick={props.onCloseHandler}></div>
            <div className={styles['text-holder']}>
                <div className={styles.title}>
                    {props.text}
                </div>
                {props.children}
                <span className={styles.close} onClick={props.onCloseHandler}>X</span>
            </div>
        </div>
    );
};

export default Modal;