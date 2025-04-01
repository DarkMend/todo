import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Eraser, FilePlus2 } from "lucide-react";
import CreateNote from "./pages/CreateNote/CreateNote";
import { useEffect, useState } from "react";
import NotesList from "./components/NotesList/NotesList";
import { INote } from "./interfaces/note";

export type hrefState = "all" | "active" | "completed" | "";

export default function App() {
  const [activeInput, setActiveInput] = useState(false);
  const [notesList, setNotesList] = useState<INote[]>([]);
  const [hrefActive, setHrefActive] = useState<hrefState>("all");
  const [notes, setNotes] = useState<INote[]>([]);

  const loadNotes = (filter: boolean = false, typeHref: hrefState = "all") => {
    const notesStorage = localStorage.getItem("notes");
    if (notesStorage) {
      setNotesList(notesStorage && JSON.parse(notesStorage));
      filter && filterNotes(JSON.parse(notesStorage), typeHref);
    }
  };

  useEffect(() => {
    loadNotes(true);
  }, []);

  const filterNotes = (notes: INote[], filterType: hrefState) => {
    setActiveInput(false);
    setHrefActive(filterType);
    if (filterType === "active") {
      setNotes(notes.filter((item) => item.status === 1));
    } else if (filterType === "completed")
      setNotes(notes.filter((item) => item.status === 2));
    else setNotes(notes);
  };

  const removeNotes = () => {
    const removedNotes = notesList.filter((item) => item.status == 1);
    localStorage.setItem("notes", JSON.stringify([...removedNotes]));
    loadNotes(true, hrefActive);
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.page}>
        <div className={styles.content}>
          {activeInput ? (
            <CreateNote loadNotes={loadNotes} />
          ) : (
            <NotesList
              notes={notes}
              setNotesList={loadNotes}
              href={hrefActive}
            />
          )}
        </div>
        <div className={styles.hr}></div>
        <div className={styles.wrapper}>
          <div className={styles.countItem}>
            <span>{notesList.filter((item) => item.status == 1).length}</span>{" "}
            items left
          </div>
          <div className={styles.nav}>
            <a
              onClick={() => filterNotes(notesList, "all")}
              className={`${hrefActive == "all" && styles.active}`}
            >
              All
            </a>
            <a
              onClick={() => filterNotes(notesList, "active")}
              className={`${hrefActive == "active" && styles.active}`}
            >
              Active
            </a>
            <a
              onClick={() => filterNotes(notesList, "completed")}
              className={`${hrefActive == "completed" && styles.active}`}
            >
              Completed
            </a>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() => (setActiveInput(true), setHrefActive(""))}
            >
              <FilePlus2 />
            </button>
            <button className={styles.button} onClick={removeNotes}>
              <Eraser />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
