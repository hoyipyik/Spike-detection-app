import Container from "./components/Container";
import Topbar from "./components/Topbar";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Topbar />
      <Container />
    </div>
  );
}

export default App;
