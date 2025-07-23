import React from "react";
import styles from "./battle-log.module.css";

const BattleLog = (props) => {
  return (
    <React.Fragment>
      <div className={styles["log-holder"]}>
        <h3>History battle</h3>
        <ul className={styles.list}>
          {props.log.map((item, i) => (
            <li>
              <strong>{item.player}:</strong>
              <div>
                {item.text}
                <span>{item.damage}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default BattleLog;
