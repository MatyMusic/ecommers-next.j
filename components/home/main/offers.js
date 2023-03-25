import styles from "./styles.module.scss";
import { offersAarray } from "../../../data/home";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <div className={styles.offers__text}>
        <p>
          להשתמש בקוד <br />
          <b>
            "MFC-2023" <br />
          </b>{" "}
         ולקבל  -30%  הנחה על כל המוצרים
        </p>
        <Link href="/browse">קנה עכשיו</Link>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersAarray.map((offer) => (
          <SwiperSlide>
            <Link href="">
              <img src={offer.image} alt="" />
            </Link>
            <span>{offer.price} ש"ח</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
