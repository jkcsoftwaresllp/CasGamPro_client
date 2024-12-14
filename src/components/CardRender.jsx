import styles from "./css/CardRender.module.css";
import { Card as CardComponent } from "./Card";

export const CardRender = ({ cards, playerName }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.gameStatus}>{playerName}</div>
      {cards.map((card, index) => (
        <CardComponent
          key={index}
          code={card}
          isShow
          setResult={() => {}}
        ></CardComponent>
      ))}
    </div>
  );
};
