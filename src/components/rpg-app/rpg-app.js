import Wrapper from "../../UI/wrapper";
import CharacterCard from "./character-card";
import styles from "./rpg-app.module.css";
import playerImage from "./player.png";
import enemyImage from "./enemy.png";
import { useState } from "react";
import BattleLog from "./battle-log";

const RpgApp = () => {
  const [nextButton, setNextButton] = useState(false);

  const [log, setLog] = useState([]);

  const [damage, setDamage] = useState(0);

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [player, setPlayer] = useState({
    hp: 100,
    mana: 100,
  });

  const [enemy, setEnemy] = useState({
    hp: 100,
    mana: 100,
  });

  const [activePlayer, setActivePlayer] = useState(null);

  const cards = [
    {
      name: "Player",
      image: playerImage,
    },
    {
      name: "Emeny",
      image: enemyImage,
    },
  ];

  const startHandler = () => {
    setActivePlayer((prev) => !prev);
  };

  const attackHandler = () => {
    const attackAmount = getRandomInt(10, 20);
    setDamage(attackAmount);

    setEnemy((prev) => ({
      ...prev,
      hp: enemy.hp - attackAmount,
    }));

    const newLog = {
      player: "PLAYER",
      text: "Damage:",
      damage: attackAmount,
    };

    setLog([...log, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(true);
  };

  const enemyAttackHandler = () => {
    const attackAmount = getRandomInt(10, 20);
    setDamage(attackAmount);

    setPlayer((prev) => ({
      ...prev,
      hp: enemy.hp - attackAmount,
    }));

    const newLog = {
      player: "ENEMY",
      text: "Damage:",
      damage: attackAmount,
    };

    setLog([...log, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(false);
  };

  return (
    <Wrapper>
      <h2 className={styles.title}>Mini-RPG Battle App</h2>
      <div className={styles.holder}>
        <div className={styles["cards-holder"]}>
          <CharacterCard
            className={activePlayer ? `${styles.active}` : ""}
            name={cards[0].name}
            image={cards[0].image}
            hp={player.hp}
            mana={player.mana}
          />
          <CharacterCard
            className={
              (activePlayer !== true) & (activePlayer !== null)
                ? `${styles.active}`
                : ""
            }
            name={cards[1].name}
            image={cards[1].image}
            hp={enemy.hp}
            mana={enemy.mana}
          />
        </div>
        <div className={styles.actions}>
          {!activePlayer && !nextButton && (
            <button onClick={startHandler}>Start Battle !!!</button>
          )}
          {activePlayer && (
            <div className={styles["btn-holder"]}>
              <button onClick={attackHandler}>Attack</button>
              <button>Skill attack</button>
              <button>Defend</button>
              <button>Heal</button>
            </div>
          )}
          {nextButton && (
            <button onClick={enemyAttackHandler}>Enemy attacks!</button>
          )}
          <BattleLog log={log} />
        </div>
      </div>
    </Wrapper>
  );
};

export default RpgApp;
