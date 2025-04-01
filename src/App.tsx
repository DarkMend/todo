import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Eraser, FilePlus2 } from "lucide-react";
import CreateNote from "./pages/CreateNote/CreateNote";
import { useEffect, useState } from "react";
import NotesList from "./components/NotesList/NotesList";
import { INote } from "./interfaces/note";

export default function App() {
  const [activeInput, setActiveInput] = useState(false);
  const [notesList, setNotesList] = useState<INote[]>([]);
  const [hrefActive, setHrefActive] = useState<
    "all" | "active" | "completed" | ""
  >("all");
  const [notes, setNotes] = useState<INote[]>([]);

  const loadNotes = () => {
    const notesStorage = localStorage.getItem("notes");
    setNotesList(notesStorage && JSON.parse(notesStorage));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    let fiteredList = notesList;
    if (hrefActive == "active")
      fiteredList = notesList.filter((item) => item.status == 1);
    if (hrefActive == "completed")
      fiteredList = notesList.filter((item) => item.status == 2);
    setNotes(fiteredList);
  }, [hrefActive, notesList]);

  const changeNotesList = (data: INote[]) => {
    setNotesList(data);
  };

  const removeNotes = () => {
    const removedNotes = notesList.filter((item) => item.status == 1);
    localStorage.setItem("notes", JSON.stringify([...removedNotes]));
    loadNotes();
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.page}>
        <div className={styles.content}>
          {activeInput ? (
            <CreateNote loadNotes={loadNotes} />
          ) : (
            <NotesList notes={notes} setNotesList={changeNotesList} />
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
              onClick={() => (setActiveInput(false), setHrefActive("all"))}
              className={`${hrefActive == "all" && styles.active}`}
            >
              All
            </a>
            <a
              onClick={() => (setActiveInput(false), setHrefActive("active"))}
              className={`${hrefActive == "active" && styles.active}`}
            >
              Active
            </a>
            <a
              onClick={() => (
                setActiveInput(false), setHrefActive("completed")
              )}
              className={`${hrefActive == "completed" && styles.active}`}
            >
              Completed
            </a>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() => (
                setActiveInput((state) => !state), setHrefActive("")
              )}
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
