import { INote } from "../../interfaces/note";
import NoteItem from "./NoteItem/NoteItem";
import styles from "./NotesList.module.scss";

export interface INotesList {
  notes: INote[];
  setNotesList: (data: INote[]) => void;
}

export default function NotesList({ notes, setNotesList }: INotesList) {
  return (
    <div className={styles.wrapper}>
      {notes.length != 0 ? (
        notes.map((item) => (
          <NoteItem key={item.id} note={item} setNotesList={setNotesList} />
        ))
      ) : (
        <div className={styles.error}>У вас нет здесь задач</div>
      )}
    </div>
  );
}
