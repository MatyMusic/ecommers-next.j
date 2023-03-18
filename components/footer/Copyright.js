import Link from "next/link";
import styles from "./styles.module.scss";
import { IoLocationSharp } from "react-icons/io5";

export default function Copyright({ country }) {
  return (
    <div className={styles.footer__copyright}>
      <section> MFC-SHOP 2023 &copy; MATY-770 </section>
      <section>
        <ul>
          {data.map((link) => (
            <li>
              <Link href={link.link} legacyBehavior>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {country.name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

const data = [
  {
    name: "מרכז הפרטיות",
    link: "",
  },
  {
    name: " Cookie מדיניות פרטיות וקובצי ",
    link: "",
  },
  {
    name: "Cookie נהל קובצי ",
    link: "",
  },
  {
    name: "תנאים והגבלות",
    link: "",
  },
  {
    name: "הודעת זכויות יוצרים",
    link: "",
  },
];
