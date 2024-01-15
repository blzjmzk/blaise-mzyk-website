import React from "react";
import styles from "./menuButton.module.css";

interface Props {
  onClick: () => void;
  ariaExpanded: boolean;
}

const MenuButton = ({ onClick, ariaExpanded = false }: Props) => {
  return (
    <button
      className={styles.menuButton}
      aria-controls="primary-navigation"
      aria-expanded={ariaExpanded}
      onClick={onClick}
    >
      <svg fill="var(--color-black)" viewBox="0 0 100 100" width="30">
        <rect
          className={[styles.line, styles.top].join(" ")}
          width="80"
          height="10"
          x="10"
          y="25"
          rx="4"
        ></rect>
        <rect
          className={[styles.line, styles.middle].join(" ")}
          width="80"
          height="10"
          x="10"
          y="45"
          rx="4"
        ></rect>
        <rect
          className={[styles.line, styles.bottom].join(" ")}
          width="80"
          height="10"
          x="10"
          y="65"
          rx="4"
        ></rect>
      </svg>
    </button>
  );
};

export default MenuButton;
