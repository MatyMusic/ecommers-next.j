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
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import Router from "next/router";

const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};

export default function signin({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //  ===============כניסה==========================
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("נא למלא כתובת אימייל")
      .email("נא להזין כתובת אימייל חוקית"),
    login_password: Yup.string().required("הקלד סיסמא בבקשה"),
  });
  // ===================הירשם========================
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("נשמח לדעת מה השם שלך")
      .min(2, "שם פרטי חייב להיות בין 2 עד 16 תווים")
      .max(16, "שם פרטי חייב להיות בין 2 עד 16 תווים")
      .matches(/^[aA-zZ א-ת ]/, "אסור להשתמש במספרים ותווים מיוחדים"),
    email: Yup.string()
      .required("תזדקק לזה כשתתחבר ואם תצטרך אי פעם לאפס את הסיסמה שלך")
      .email("הכנס כתובת אימייל תקינה"),
    password: Yup.string()
      .required(
        "הזן שילוב של לפחות שישה מספרים, אותיות וסימני פיסוק (כגון ! ו-&)"
      )
      .min(6, "סיסמא חייבת להיות לפחות בת 6 תווים.")
      .max(36, "הסיסמה לא יכולה להיות יותר מ-36 תווים"),
    conf_password: Yup.string()
      .required("אמת סיסמתך")
      .oneOf([Yup.ref("password")], "הססמאות חייבות להיות זהות."),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setUser({ ...user, error: "", success: data.message });

      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);

    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}

      <Header />
      <div className={styles.login}>
        {/* כניסה */}
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
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
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

                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}

                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">שכחתי סיסמא</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>הירשם באמצעות</span>

              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.socials__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} />
                        {provider.name} להיכנס עם
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* =================הירשם  =======================*/}
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>הירשם</h1>
            <p>קבל גישה לאחד משירותי הקניות הטובים בעולם</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="שם מלא"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="כתובת אימייל"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder=" סיסמא"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder=" אימות סיסימא"
                    onChange={handleChange}
                  />

                  <CircledIconBtn type="submit" text="הירשם" />
                </Form>
              )}
            </Formik>

            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country="ישראל" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
}
