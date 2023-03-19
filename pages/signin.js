import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "@/components/inputs/loginInput";

export default function signin() {
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              ! נשמח מאוד שתצטרף אלינו
              <Link href="/"> {""} כניסה לחנות </Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>כניסה</h1>
            <p>קבל גישה לאחד משירותי הקניות הטובים בעולם</p>
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput icon="password" placeholder="כתובת אימייל" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="ישראל" />
    </>
  );
}
