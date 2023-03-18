import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "../components/header";
import Footer from "@/components/footer";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  return (
    <>
      <div>
        <Header country={country} />
        <Footer country={country} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get("https://api.ipregistry.co/?key=fjs9swf5ozx3smkt")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "ישראל",
        flag: "https://www.yo-yoo.co.il/flags/images/fca739.png",
      },
    },
  };
}
