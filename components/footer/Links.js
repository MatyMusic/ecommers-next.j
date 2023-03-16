// import Link from "next/link";
// import styles from "./styles.module.scss";

// export default function Links() {
//   return (
//     <div className={styles.footer__links}>
//       {links.map((link, i) => (
//         <ul>
//           {i === 0 ? (
//             <img src="../../../logo.png" alt="" />
//           ) : (
//             <b>{link.heading}</b>
//           )}
//           {link.links.map((link) => (
//             <li>
//               <Link href={link.link}>{link.name}</Link>
//             </li>
//           ))}
//         </ul>
//       ))}
//     </div>
//   );
// }
// const links = [
//   {
//     heading: "MFC-SHOPPING",
//     links: [
//       {
//         name: "עלינו",
//         link: "",
//       },
//       {
//         name: "צור קשר",
//         link: "",
//       },
//       {
//         name: "רשתות חברתיות",
//         link: "",
//       },
//       {
//         name: "",
//         link: "",
//       },
//     ],
//   },
//   {
//     heading: "עזרה / תמיכה",
//     links: [
//       {
//         name: "מידע על משלוח",
//         link: "",
//       },
//       {
//         name: "החזרות",
//         link: "",
//       },
//       {
//         name: "איך להזמין",
//         link: "",
//       },
//       {
//         name: "איך לעקוב",
//         link: "",
//       },
//       {
//         name: "מדריך מידות",
//         link: "",
//       },
//     ],
//   },
//   {
//     heading: "שירות לקוחות",
//     links: [
//       {
//         name: "שירות לקוחות",
//         link: "",
//       },
//       {
//         name: "תנאים",
//         link: "",
//       },
//       {
//         name: "צרכנים (עסקאות)",
//         link: "",
//       },
//       {
//         name: "השתתף בסקר המשוב שלנו",
//         link: "",
//       },
//     ],
//   },
// ];



import Link from "next/link";
import styles from "./styles.module.scss";

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul>
          {i === 0 ? (
            <img src="../../../logo.png" alt="" />
          ) : (
            <b>{link.heading}</b>
          )}
          {link.links.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
const links = [
  {
    heading: "SHOPPAY",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "Customer service",
    links: [
      {
        name: "Customer service",
        link: "",
      },
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Consumers (Transactions)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];
