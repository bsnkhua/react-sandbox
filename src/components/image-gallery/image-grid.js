import React, { useState } from "react";
import styles from './image-grid.module.css'

const ImageGrid = (props) => {

    return (
        <React.Fragment>
            <h3>Image grid</h3>
            <div className={styles.filter}>
                <label htmlFor="filter">Filter: </label>
                <input value={props.filterText} id="filter" type="text" onChange={props.filterHandler}/>
            </div>
            <ul className={styles.list}>
                {props.items.map((item, index) => (
                    <li key={index}>
                        <img src={item.image} alt="image description" />
                        <span className={styles.name}>{item.name}</span>
                        <button onClick={() => props.deleteHandler(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default ImageGrid;