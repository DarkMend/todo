import { ChangeEvent, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./CreateNote.module.scss";
import { IMessage } from "../../interfaces/message";

export default function CreateNote() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<IMessage>({
    body: "",
    type: null,
  });

  const getNotes = () => {
    try {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch {
      return [];
    }
  };

  const saveNote = () => {
    if (input.length == 0) {
      setMessage({
        type: "error",
        body: "Введите текст",
      });
      return;
    }

    const currentNotes = getNotes();
    const newNote = {
      id: Date.now(),
      text: input,
      status: 1,
    };

    const updateNote = [...currentNotes, newNote];
    localStorage.setItem("notes", JSON.stringify(updateNote));
    setMessage({ type: "success", body: "Запись сохранена" });
    setTimeout(() => {
      setInput("");
      setMessage({ type: null, body: "" });
    }, 2000);
  };

  return (
    <div className={styles.form}>
      <Input
        placeholder="New note"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        message={message}
      />
      <Button onClick={saveNote}>Сохранить</Button>
    </div>
  );
}
