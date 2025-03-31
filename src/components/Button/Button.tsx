import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: IButton) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
}
