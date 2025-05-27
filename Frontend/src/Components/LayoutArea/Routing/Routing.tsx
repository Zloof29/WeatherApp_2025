import { Route, Routes } from "react-router";
import styles from "./Routing.module.css";

export function Routing(): React.ReactElement {
  return (
    <div className={styles.Routing}>
      <Routes>{/* <Route path="/" element{} /> */}</Routes>
    </div>
  );
}
