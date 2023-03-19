import Link from "next/link";
import styles from "./styles.module.scss";
import { signOut, signIn } from "next-auth/react";

export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4> MFC-SHOPPING</h4>
      {session ? (
        <div className={styles.flex}>
          <img
            src={session.user.image}
            // src="https://avatars.githubusercontent.com/u/95618734?s=400&u=1b7dcfb9601ae7715611a49146e23d93701562ed&v=4"
            alt=""
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>שמחים שחזרת, </span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>יציאה</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>הירשם</button>
          <button className={styles.btn_outlined}
           onClick={() => signIn()}
          >כניסה</button>
        </div>
      )}

      <ul>
        <li>
          <Link href="/profile">חשבון</Link>
        </li>
        <li>
          <Link href="/profile/orders">הזמנות שלי</Link>
        </li>
        <li>
          <Link href="/profile/messages">הודעות</Link>
        </li>
        <li>
          <Link href="/profile/address">כתובת</Link>
        </li>
        <li>
          <Link href="/profile/whishlist ">רשימת המשאלות</Link>
        </li>
      </ul>
    </div>
  );
}
