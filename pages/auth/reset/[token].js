import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import LoginInput from "../../../components/inputs/loginInput";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import jwt from "jsonwebtoken";

export default function reset({ user_id }) {
  console.log("user_id", user_id);
  const [password, setPassword] = useState("");
  const [conf_password, setConf_Password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("אנא הזן את הסיסמה החדשה שלך")
      .min(6, "סיסמא חייבת להיות לפחות בת 6 תווים.")
      .max(36, "הסיסמה לא יכולה להיות יותר מ-36 תווים"),
    conf_password: Yup.string()
      .required("אמת סיסמתך")
      .oneOf([Yup.ref("password")], "הססמאות חייבות להיות זהות."),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });

      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };

      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              אפס סיסמא? <Link href="/">היכנס במקום</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder=" סיסמא"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder=" אימות סיסמא "
                  onChange={(e) => setConf_Password(e.target.value)}
                />

                <CircledIconBtn type="submit" text=" שנה סיסמא" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {/* {success && <span className={styles.success}>{success}</span>} */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;

  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

  return {
    props: {
      user_id: user_id.id,
    },
  };
}

