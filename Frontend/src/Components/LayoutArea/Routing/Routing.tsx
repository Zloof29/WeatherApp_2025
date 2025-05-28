import { Route, Routes } from "react-router";
import styles from "./Routing.module.css";
import { Weather } from "../../Weather/Weather";
import { Page404 } from "../Page404/Page404";

export function Routing(): React.ReactElement {
  return (
    <div className={styles.Routing}>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
