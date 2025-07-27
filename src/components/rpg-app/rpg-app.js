import Wrapper from "../../UI/wrapper";
import CharacterCard from "./character-card";
import styles from "./rpg-app.module.css";
import playerImage from "./player.png";
import enemyImage from "./enemy.png";
import { useEffect, useState } from "react";
import BattleLog from "./battle-log";
import Modal from "../modal";

const RpgApp = () => {
  const [showModal, setShowModal] = useState(false);

  const [winner, setWinner] = useState(null);

  const [isDefend, setIsDefend] = useState(false);

  const [nextButton, setNextButton] = useState(false);

  const [log, setLog] = useState([]);

  const [damage, setDamage] = useState(0);

  const [mana, setMana] = useState(0);

  const [heal, setHeal] = useState(0);

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
      name: "Enemy",
      image: enemyImage,
    },
  ];

  const startHandler = () => {
    setActivePlayer((prev) => !prev);
  };

  const attackHandler = () => {
    let attackAmount = getRandomInt(10, 20);

    if (isDefend) {
      attackAmount = attackAmount / 2;
    }

    setDamage(attackAmount);

    setEnemy((prev) => ({
      ...prev,
      hp: Math.max(prev.hp - attackAmount, 0),
    }));

    const newLog = {
      player: "PLAYER",
      text: "Damage:",
      damage: attackAmount,
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(true);

    setIsDefend(false);
  };

  const skillAttackHandler = () => {
    let attackAmount = getRandomInt(25, 30);

    if (isDefend) {
      attackAmount = attackAmount / 2;
    }

    setDamage(attackAmount);

    setEnemy((prev) => ({
      ...prev,
      hp: Math.max(prev.hp - attackAmount, 0),
    }));

    const manaAmount = 30;
    setMana(manaAmount);

    setPlayer((prev) => ({
      ...prev,
      mana: Math.max(prev.mana - manaAmount, 0),
    }));

    const newLog = {
      player: "PLAYER",
      text: "Skill Damage:",
      damage: attackAmount,
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(true);

    setIsDefend(false);
  };

  const healHandler = () => {
    const healAmount = 20;
    setHeal(healAmount);

    const manaAmount = 20;
    setMana(manaAmount);

    setPlayer((prev) => ({
      ...prev,
      mana: Math.max(prev.mana - manaAmount, 0),
    }));

    setPlayer((prev) => ({
      ...prev,
      hp: prev.hp + healAmount,
    }));

    const newLog = {
      player: "PLAYER",
      text: "Heal:",
      damage: healAmount,
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(true);

    setIsDefend(false);
  };

  const defendHandler = () => {
    setIsDefend(true);

    const newLog = {
      player: "PLAYER",
      text: "Defend:",
      damage: "(Next Enemy damage)/2",
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(true);
  };

  // Enemy
  const opponentsHandler = () => {
    const functions = [
      {
        fn: enemyAttackHandler,
        condition: true,
      },
      {
        fn: enemySkillAttackHandler,
        condition: enemy.mana >= 30,
      },
      {
        fn: enemyHealHandler,
        condition: enemy.mana >= 20,
      },
      {
        fn: enemyDefendHandler,
        condition: true,
      },
    ];

    const available = functions.filter((item) => item.condition);

    if (available.length === 0) return;

    const random = available[Math.floor(Math.random() * available.length)];
    random.fn();
  };

  const enemyAttackHandler = () => {
    let attackAmount = getRandomInt(10, 20);

    if (isDefend) {
      attackAmount = attackAmount / 2;
    }

    setDamage(attackAmount);

    setPlayer((prev) => ({
      ...prev,
      hp: prev.hp - attackAmount,
    }));

    const newLog = {
      player: "ENEMY",
      text: "Damage:",
      damage: attackAmount,
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(false);

    setIsDefend(false);
  };

  const enemySkillAttackHandler = () => {
    let attackAmount = getRandomInt(25, 30);

    if (isDefend) {
      attackAmount = attackAmount / 2;
    }

    setDamage(attackAmount);

    setPlayer((prev) => ({
      ...prev,
      hp: Math.max(prev.hp - attackAmount, 0),
    }));

    const manaAmount = 30;
    setMana(manaAmount);

    setEnemy((prev) => ({
      ...prev,
      mana: Math.max(prev.mana - manaAmount, 0),
    }));

    const newLog = {
      player: "ENEMY",
      text: "Skill Damage:",
      damage: attackAmount,
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(false);

    setIsDefend(false);
  };

  const enemyHealHandler = () => {
    const healAmount = 20;
    setHeal(healAmount);

    const manaAmount = 20;
    setMana(manaAmount);

    setEnemy((prev) => ({
      ...prev,
      mana: Math.max(prev.mana - manaAmount, 0),
    }));

    setEnemy((prev) => ({
      ...prev,
      hp: enemy.hp + healAmount,
    }));

    const newLog = {
      player: "ENEMY",
      text: "Heal:",
      damage: healAmount,
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(false);

    setIsDefend(false);
  };

  const enemyDefendHandler = () => {
    setIsDefend(true);

    const newLog = {
      player: "ENEMY",
      text: "Defend:",
      damage: "(Next Player damage)/2",
    };

    setLog((prev) => [...prev, newLog]);

    setActivePlayer((prev) => !prev);

    setNextButton(false);
  };

  // Enemy

  const resetHandler = () => {
    player.hp = 100;
    player.mana = 100;
    enemy.hp = 100;
    enemy.mana = 100;
    setActivePlayer(null);
    setNextButton(false);
    setLog([]);
  };

  const onCloseHandler = () => {
    setShowModal(false);
    resetHandler();
  };

  useEffect(() => {
    if (enemy.hp <= 0) {
      setWinner("Player WIN!!!");
      setShowModal(true);
    }
  }, [enemy.hp]);

  useEffect(() => {
    if (player.hp <= 0) {
      setWinner("Enemy WIN!!!");
      setShowModal(true);
    }
  }, [player.hp]);

  return (
    <Wrapper>
      {showModal && <Modal text={winner} onCloseHandler={onCloseHandler} />}
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
              activePlayer !== true && activePlayer !== null
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
              {player.mana >= 30 ? (
                <button onClick={skillAttackHandler}>Skill attack</button>
              ) : (
                <button disabled onClick={skillAttackHandler}>
                  Skill attack
                </button>
              )}
              <button onClick={defendHandler}>Defend</button>
              {player.mana >= 20 && player.hp < 100 ? (
                <button onClick={healHandler}>Heal</button>
              ) : (
                <button disabled onClick={healHandler}>
                  Heal
                </button>
              )}
            </div>
          )}
          {nextButton && (
            <button onClick={opponentsHandler}>Opponent's move!</button>
          )}
          <BattleLog log={log} />
        </div>
      </div>
    </Wrapper>
  );
};

export default RpgApp;
