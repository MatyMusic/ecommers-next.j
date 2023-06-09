import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

export default function Main() {
  const { cart } = useSelector((state) => ({ ...state }));
  console.log(cart.length);

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" legacyBehavior>
          <a className={styles.logo}>
            <img src="../../../logo.png" alt="" />
            {/* <img src="../../../logo7.png" alt="" style={{  height:'7rem',width: '14rem', background:'#f8f8f8' , borderTopRightRadius:'80px', }} /> */}
          </a>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder=" ... חיפוש"/>
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>

        <Link href="/cart" legacyBehavior>
          <a className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
