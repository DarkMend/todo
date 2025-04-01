import { hrefState } from "../../App";
import { INote } from "../../interfaces/note";
import NoteItem from "./NoteItem/NoteItem";
import styles from "./NotesList.module.scss";

export interface INotesList {
  notes: INote[];
  setNotesList: (type: boolean, typeHref: hrefState) => void;
  href: hrefState;
}

export default function NotesList({ notes, setNotesList, href }: INotesList) {
  return (
    <div className={styles.wrapper}>
      {notes.length != 0 ? (
        notes.map((item) => (
          <NoteItem
            key={item.id}
            note={item}
            href={href}
            setNotesList={setNotesList}
          />
        ))
      ) : (
        <div className={styles.error}>У вас нет здесь задач</div>
      )}
    </div>
  );
}
