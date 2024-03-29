import styles from "./PizzasNotFound.module.scss";
import React from "react";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению пицц с таким названием нет в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
