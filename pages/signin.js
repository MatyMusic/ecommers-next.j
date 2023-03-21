import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInput";
import { useState } from "react";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { getProviders, signIn } from "next-auth/react";

const initialvalues = {
  login_email: "",
  login_password: "",
};

export default function signin({ providers }) {
  console.log(providers);

  const [user, setUser] = useState(initialvalues);
  const { login_email, login_password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("נא למלא כתובת אימייל")
      .email("נא להזין כתובת אימייל חוקית"),
    login_password: Yup.string().required("הקלד סיסמא בבקשה"),
  });

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
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="כתובת אימייל"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder=" סיסמא"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="כניסה" />
                  <div className={styles.forgot}>
                    <Link href="/forget">שכחתי סיסמא</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>הירשם באמצעות</span>

              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => (
                  <div key={provider.name}>
                    <button
                      className={styles.socials__btn}
                      onClick={() => signIn(provider.id)}
                    >
                      <img src={`../../icons/${provider.name}.png`} />
                      {provider.name} להיכנס עם
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer country="ישראל" />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
