import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top({ country }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li>
            {/* <img src="https://www.yo-yoo.co.il/flags/images/fca739.png" /> */}
            <img src={country.flag} />
            {/* <span>Israel/ILS</span> */}
            <span>{country.name}</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>הגנת הצרכן</span>
          </li>
          <li className={styles.li}>
            <span>שירות לקוחות</span>
          </li>
          <li>
            <span> עזרה</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span> רשימת המשאלות</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {loggedIn ? (
              <li>
                <div className={styles.flex}>
                  {/* <RiAccountPinCircleLine /> */}
                  <img
                    src="https://avatars.githubusercontent.com/u/95618734?s=400&u=1b7dcfb9601ae7715611a49146e23d93701562ed&v=4"
                    alt=""
                  />
                  <span>maty gurfinkel</span>
                  <RiArrowDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>חשבון</span>
                  <RiArrowDownFill />
                </div>
              </li>
            )}

            {visible && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
