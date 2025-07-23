import React from "react";
import styles from "./character-card.module.css";

const CharacterCard = (props) => {
  return (
    <React.Fragment>
      <div className={`${styles.card} ${props.className}`}>
        <h2>{props.name}</h2>
        <div className={styles.image}>
          <img src={props.image} alt="image description" />
        </div>
        <div className={styles.stats}>
          <div className={styles.stroke}>
            <span>HP</span>
            <div className={styles.progress}>
              <div
                className={styles.hp}
                style={{ width: `${props.hp}%` }}
              ></div>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.stroke}>
            <span>MANA</span>
            <div className={styles.progress}>
              <div
                className={styles.mana}
                style={{ width: `${props.mana}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CharacterCard;
