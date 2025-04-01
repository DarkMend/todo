import { Check } from "lucide-react";
import { INote } from "../../../interfaces/note";
import styles from "./NoteItem.module.scss";
import { hrefState } from "../../../App";

export interface INoteItem {
  note: INote;
  setNotesList: (type: boolean, typeHref: hrefState) => void;
  href: hrefState;
}

export default function NoteItem({ note, setNotesList, href }: INoteItem) {
  const changeStatus = () => {
    const notes = localStorage.getItem("notes");
    if (!notes) {
      return;
    }
    const notesList: INote[] = JSON.parse(notes);

    const updateNotes = notesList.map((item) =>
      item.id == note.id ? { ...item, status: 2 } : item
    );
    localStorage.setItem("notes", JSON.stringify(updateNotes));
    setNotesList(true, href);
  };

  return (
    <div
      className={`${styles.noteItem} ${note.status == 2 && styles.completed} `}
    >
      <div>
        <button
          className={styles.button}
          disabled={note.status == 2}
          onClick={changeStatus}
        >
          <Check />
        </button>
      </div>
      <div className={styles.text}>{note.text}</div>
    </div>
  );
}
