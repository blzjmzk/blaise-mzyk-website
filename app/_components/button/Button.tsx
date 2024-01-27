import styles from "./Button.module.css";
import React, { CSSProperties, ReactNode } from "react";
import PropTypes from "prop-types";

interface Props {
  variant: "primary" | "outline" | "delete";
  children: ReactNode;
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({
  variant,
  children,
  width,
  maxWidth,
  disabled,
  type,
  onClick,
}: Props) => {
  const className = `${styles.button} ${styles[variant]}`;

  const style: CSSProperties = {
    width: width || "auto",
    maxWidth: maxWidth || "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
