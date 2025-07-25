import React, { useEffect, useRef } from "react";
import styles from "./battle-log.module.css";

const BattleLog = (props) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    box.scrollTop = box.scrollHeight;
  }, [props.log]);

  return (
    <React.Fragment>
      <div ref={boxRef} className={styles["log-holder"]}>
        <h3>History battle</h3>
        <ul className={styles.list}>
          {props.log.map((item, i) => (
            <li key={i}>
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
