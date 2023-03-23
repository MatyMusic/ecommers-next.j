import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">חנות</Link>
        </li>
        <li>
          <Link href="">מכשירי חשמל</Link>
        </li>
        <li>
          <Link href="">שעונים</Link>
        </li>
      </ul>
    </div>
  );
}
