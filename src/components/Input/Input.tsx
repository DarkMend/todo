import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import { IMessage } from "../../interfaces/message";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  message?: IMessage;
}

export default function Input({ message, ...props }: IInput) {
  return (
    <div className={styles.wrapper}>
      <input type="text" className={styles.input} {...props} />
      <div
        className={`${styles.message} ${
          message?.type == "error" ? styles.error : styles.success
        }`}
      >
        {message?.body}
      </div>
    </div>
  );
}
