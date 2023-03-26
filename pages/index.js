import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "../components/header";
import Footer from "@/components/footer";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "@/components/productsSwiper";
import db from "@/utils/db";
import Product from "@/models/Product";

export default function Home({ country, products }) {
  console.log("products", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="maty"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="maty-2"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="maty-2"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="maty-3"
              products={women_accessories}
              background="#000"
            />
          </div>

          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper products={gamingSwiper} header="maty4" bg="#2f82ff" />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="maty 5"
            bg="#5a31f4"
          />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();

  let products = await Product.find().sort({ createAt: -1 }).lean();
  console.log(products);

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
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "ישראל",
        flag: "https://www.yo-yoo.co.il/flags/images/fca739.png",
      },
    },
  };
}
