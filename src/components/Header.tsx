import styles from "./Header.module.css";
import logo from "../assets/rocket.png";

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.header_img} src={logo} alt="imagem de foguete" />
      <p className={styles.header_title}>
        to<span>do</span>
      </p>
    </header>
  );
}
