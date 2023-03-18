import Link from "next/link";
import styles from "./styles.module.scss";

export default function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>הירשם לניוזלטר שלנו</h3>
      <div className={styles.footer_flex}>
        <input type="text" placeholder='כתובת הדוא"ל שלך' />
        <button className={styles.btn_primary}>הירשם</button>
      </div>
      <p>
        בלחיצה על כפתור הירשם, אתה מסכים לכל
        <Link href="">
          {" "}
          {""}מדיניות הפרטיות והעוגיות שלנו {""}
        </Link>
      </p>
    </div>
  );
}
