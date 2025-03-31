import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Eraser, FilePlus2 } from "lucide-react";
import CreateNote from "./pages/CreateNote/CreateNote";

export default function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.page}>
        <div className={styles.content}>
          <CreateNote />
        </div>
        <div className={styles.hr}></div>
        <div className={styles.wrapper}>
          <div className={styles.countItem}>
            <span>2</span> items left
          </div>
          <div className={styles.nav}>
            <a>All</a>
            <a>Active</a>
            <a>Completed</a>
          </div>
          <div className={styles.actions}>
            <button className={styles.button}>
              <FilePlus2 />
            </button>
            <button className={styles.button}>
              <Eraser />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
